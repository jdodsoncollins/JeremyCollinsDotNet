import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as helpers from '../lib/website-analytics.mjs';

// Deterministic component harness, not a browser/network test. Google never loads.
function harness({ initialConsent = null, failingStorage = false } = {}) {
  const state = [], refs = [], previousDeps = [];
  let stateIndex = 0, refIndex = 0, effectIndex = 0, pending = [], tree;
  let stored = initialConsent, reloads = 0, scripts = 0;
  const storage = { getItem: () => stored, setItem: (_key, value) => {
    if (failingStorage) throw new Error('Storage denied');
    stored = value;
  } };
  const window = { localStorage: storage, location: { search: '?code=private', hostname: 'www.jeremycollins.net', reload() { reloads++; } } };
  const document = { referrer: 'https://www.google.com/search?q=private', cookie: '_ga=old', createElement: () => ({}), head: { appendChild() { scripts++; } } };
  const react = {
    useState(initial) { const i = stateIndex++; if (!(i in state)) state[i] = initial; return [state[i], (next) => { state[i] = next; }]; },
    useRef(initial) { const i = refIndex++; return refs[i] ??= { current: initial }; },
    useEffect(fn, deps) { const i = effectIndex++; if (!previousDeps[i] || deps.some((d, j) => d !== previousDeps[i][j])) pending.push(fn); previousDeps[i] = deps; },
  };
  const jsx = (type, props) => ({ type, props });
  const compiled = ts.transpileModule(fs.readFileSync('components/website-analytics.tsx', 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, { exports, window, document, localStorage: storage, process: { env: { NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-TEST123' } }, require(name) {
    if (name === 'react') return react;
    if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
    if (name === 'next/navigation') return { usePathname: () => '/' };
    if (name === 'next/link') return { default: 'a' };
    if (name === '@/lib/website-analytics.mjs') return helpers;
    if (name.endsWith('.css')) return { default: {} };
    throw new Error(`Unexpected import: ${name}`);
  } });
  function render() { stateIndex = refIndex = effectIndex = 0; pending = []; tree = exports.WebsiteAnalytics(); for (const fn of pending) fn(); return tree; }
  function find(node, label) {
    if (!node || typeof node !== 'object') return null;
    if (node.type === 'button' && node.props.children === label) return node;
    const children = node.props?.children;
    for (const child of Array.isArray(children) ? children.flat(Infinity) : [children]) { const match = find(child, label); if (match) return match; }
    return null;
  }
  return { window, render, click(label) { const button = find(tree, label); assert.ok(button, label); button.props.onClick(); }, get scripts() { return scripts; }, get reloads() { return reloads; }, get stored() { return stored; } };
}

test('component loads nothing before opt-in or after a first-visit decline', () => {
  const h = harness(); h.render(); h.render(); assert.equal(h.scripts, 0);
  h.click('Decline analytics'); h.render(); assert.equal(h.scripts, 0);
  assert.equal(h.window['ga-disable-G-TEST123'], true);
});

test('withdrawal with blocked storage stops collection without reloading stale acceptance', () => {
  const h = harness({ initialConsent: 'accepted', failingStorage: true });
  h.render(); h.render(); assert.equal(h.scripts, 1);
  h.click('Analytics preferences'); h.render(); h.click('Decline analytics'); h.render();
  assert.equal(h.reloads, 0); assert.equal(h.stored, 'accepted');
  assert.equal(h.window['ga-disable-G-TEST123'], true);
  assert.equal(h.scripts, 1);
});

test('successful withdrawal persists declined state before reload', () => {
  const h = harness({ initialConsent: 'accepted' }); h.render(); h.render();
  h.click('Analytics preferences'); h.render(); h.click('Decline analytics');
  assert.equal(h.reloads, 1); assert.equal(h.stored, 'declined');
  assert.equal(h.window['ga-disable-G-TEST123'], true);
});
