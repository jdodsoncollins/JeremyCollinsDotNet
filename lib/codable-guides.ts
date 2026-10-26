export const CODABLE_GUIDES_BASE = "/codable/guides";

export type CodableGuide = {
  slug: string;
  publishedAt: string;
  updatedAt: string;
  title: string;
  description: string;
  tool: string;
  duration: string;
  screenshot: number;
  screenshotCaption: string;
  introduction: string;
  beforeYouStart: string;
  steps: { title: string; paragraphs: string[]; code?: string; expected?: string }[];
  checks: { title: string; text: string }[];
  limits: string[];
};

export const CODABLE_GUIDES: CodableGuide[] = [
  {
    slug: "inspect-element-safari-iphone",
    publishedAt: "2026-10-26",
    updatedAt: "2026-10-26",
    title: "Inspect an element in Safari on iPhone",
    description:
      "Select a live element, read its HTML, and try a CSS change with Codable’s Safari extension. A practical walkthrough using the built-in local demo.",
    tool: "Elements",
    duration: "5 minutes",
    screenshot: 0,
    screenshotCaption:
      "Codable’s Elements panel in Safari, inspecting the app’s bundled demo page. This is an app screenshot; the walkthrough below uses the Inspect me button.",
    introduction:
      "A button looks wrong on your phone. Start with the element that Safari is actually rendering: its markup, dimensions, and computed styles. Codable lets you do this in the Safari tab where the problem happens, including a page you’re already signed into.",
    beforeYouStart:
      "Install Codable on an iPhone running iOS 26.4 or later. In Settings → Apps → Safari → Extensions, enable Codable. Open Codable’s Extension screen and use its local demo button to open the bundled practice page in Safari. Allow Codable access to that page when Safari asks.",
    steps: [
      {
        title: "Select a visible element",
        paragraphs: [
          "Open Codable from Safari’s extensions menu near the address field. Choose Elements, then Select. The popover closes so you can choose something on the page.",
          "Scroll to the Elements section of the demo and tap Inspect me. Reopen Codable from Safari’s extensions menu. The selected button should appear in the DOM tree. If another panel is showing, choose Elements again.",
        ],
        expected: "The selected element is a button with the class tiny.",
      },
      {
        title: "Connect the pixels to the markup",
        paragraphs: [
          "Open HTML to read the selected element’s markup. Tree shows where it sits among its parents and siblings. Frame shows its bounding box and page measurements; Style shows editable style rows.",
          "Select a parent in Tree when you suspect its layout is constraining the button. A button’s own width can look correct while its container is too narrow.",
        ],
      },
      {
        title: "Try one visible CSS change",
        paragraphs: [
          "With Inspect me selected, open Style. In the empty property row, enter outline as the property and 3px solid #075df5 as the value, then tap Save. Dismiss the popover to see the outline on the page.",
          "Reopen Codable and use Reset on that inline property to remove the override. Refresh in Elements reads the current page again. A page reload also removes this demo edit.",
        ],
        expected: "The outline appears around the button without changing the website’s source files.",
      },
      {
        title: "Take the finding back to your code",
        paragraphs: [
          "Record the element, the original value, the value you tried, and the visible result. Change the site’s source CSS in your project, then retest on the phone. An edit in the inspector is a local experiment, not a published fix.",
        ],
      },
    ],
    checks: [
      { title: "Codable is missing from Safari", text: "Check Settings → Apps → Safari → Extensions and enable it. In Safari, open the page’s extensions controls and check Codable’s permission for that website. An open tab may need a reload after first enabling the extension." },
      { title: "Selection seems to disappear", text: "Select deliberately closes the popover. Tap the page element, then reopen Codable. If the site replaces that node, select its new version instead of editing a stale selection." },
      { title: "A style change has no visible effect", text: "Check that you selected the right element, entered valid CSS, and tapped Save. A site’s scripts or an important rule can override your experiment. Inspect the parent and compare Frame before changing more properties." },
    ],
    limits: [
      "Live edits affect this page instance. They do not update a server, a repository, or everyone else’s browser.",
      "Protected browser pages, inaccessible frames, and closed shadow roots can limit inspection. The extension is not a replacement for every feature in desktop Safari Web Inspector.",
      "Source can show a fresh response or a live DOM fallback; it is not a recording of the original navigation response. Use Elements for the current rendered DOM.",
    ],
  },
  {
    slug: "javascript-console-errors-ipad",
    publishedAt: "2026-10-26",
    updatedAt: "2026-10-26",
    title: "View JavaScript console errors on iPad",
    description:
      "Capture an error in the Safari tab where it happens, inspect its context, and compare it with a failed request using Codable on iPad.",
    tool: "Console + Network",
    duration: "6 minutes",
    screenshot: 1,
    screenshotCaption:
      "Codable’s Console running document.title on the bundled demo. The same Console workflow is available on iPad; this app screenshot shows the compact phone layout.",
    introduction:
      "When a button does nothing, collect what happens at the moment you tap it. A console error is evidence, but it is not automatically the cause. This walkthrough first proves that capture is working, then produces an intentional error you can inspect.",
    beforeYouStart:
      "Install Codable on an iPad running iPadOS 26.4 or later. Enable it in Settings → Apps → Safari → Extensions. From Codable’s Extension screen, open the local demo in Safari and allow the extension on the page. These steps also work on iPhone.",
    steps: [
      {
        title: "Start capture before reproducing the problem",
        paragraphs: [
          "Open Codable from Safari’s extensions menu and choose Console. Use Clear to start with an empty view. Close the popover, tap Log button event on the demo page, then reopen Codable → Console.",
          "Look for Button clicked. Opening the extension after a problem has already happened cannot reliably recover earlier console output. After a navigation or reload, open Console again before repeating the action.",
        ],
        expected: "Button clicked appears with the demo’s action and timestamp.",
      },
      {
        title: "Produce an intentional error",
        paragraphs: [
          "Open Network once before making the next request, then return to Console and Clear. Close the popover and tap Fetch error in the demo’s Network section. Reopen Console and find Fetched demo error.",
          "This example is an explicit console.error message from the demo after an error response. It is not an uncaught JavaScript exception. On your own site, an uncaught error or rejected promise may include a source location and stack; preserve that detail when it is available.",
        ],
        expected: "You see a deliberate demo error, and the page remains usable.",
      },
      {
        title: "Check the page you are debugging",
        paragraphs: [
          "Enter the following expression in Console and tap Run. It reads the current page’s button label without changing the page.",
          "For a real broken button, compare the visible error with the handler you expected to run. Follow the first relevant frame in your app’s code, and note whether the same error repeats with the same action. Avoid blaming an unrelated background error.",
        ],
        code: 'document.querySelector("#fetchError")?.textContent',
        expected: "The result is Fetch error on the bundled demo.",
      },
      {
        title: "Compare the request with the error",
        paragraphs: [
          "Choose Network, tap Refresh, and select the /api/error request. Read the status and the available response preview. A failed response can explain an error path; a successful request can help rule one out. The order of two entries alone does not prove that one caused the other.",
          "When handing this to a teammate or coding agent, include the exact action, expected result, observed error, relevant source location, and request status. Remove tokens, personal data, and private page content before sharing.",
        ],
      },
    ],
    checks: [
      { title: "Console is empty", text: "Confirm access to the current tab, open Console first, and reproduce the action again. Try document.title with Run to confirm that evaluation reaches the page. Page restrictions or a missing bridge can prevent capture." },
      { title: "Network has no matching request", text: "Open Network before repeating the action. Detailed fetch and XMLHttpRequest capture begins when that panel is initialized; older resource-timing rows cannot reconstruct missing bodies or headers." },
      { title: "An error has no useful stack", text: "A plain console.error string does not contain a thrown Error’s stack. Browser restrictions, minification, and cross-origin scripts can also reduce detail. Use a development build with useful error handling or desktop remote inspection when you need breakpoints." },
    ],
    limits: [
      "Console values are bounded snapshots. They are not the live, expandable object handles, debugger pauses, or complete execution history of desktop developer tools.",
      "Capture may miss early startup output, workers, inaccessible frames, and browser-internal messages. No output does not prove that no error occurred.",
      "Network combines instrumented fetch/XHR activity with resource timing. It cannot expose every browser request, and response previews, headers, and timing details can be unavailable or truncated.",
      "The companion app’s Scratchpad runs in a separate browser runtime. It does not share the inspected Safari page’s variables or authenticated session.",
    ],
  },
  {
    slug: "debug-mobile-layout-overflow",
    publishedAt: "2026-10-26",
    updatedAt: "2026-10-26",
    title: "Investigate a broken mobile layout",
    description:
      "Find why a table makes a mobile page too wide. Measure the live layout, test a scoped CSS fix, and verify nearby viewport sizes with Codable.",
    tool: "Elements + Resize",
    duration: "8 minutes",
    screenshot: 2,
    screenshotCaption:
      "Codable’s Resize tool showing the bundled demo at a narrow viewport. The overflow table used below is a temporary practice example you add yourself.",
    introduction:
      "A page that scrolls sideways usually needs a smaller investigation than “make everything responsive.” Find the element that extends past the viewport, understand why it is wide, and decide whether it should wrap, shrink, or scroll inside its own container.",
    beforeYouStart:
      "Enable Codable’s Safari extension and open the local demo from the app’s Extension screen. Use a narrow Safari window or an iPhone. The demo is normally responsive; the first step creates a temporary overflowing table so you have a known problem to investigate.",
    steps: [
      {
        title: "Create a controlled example on the local demo",
        paragraphs: [
          "Open Codable → Console. Review this snippet, then run it only on the bundled demo. It adds a small sample table with a deliberately fixed width. It makes no network request and contains no private data. Reload the demo to remove it.",
        ],
        code: `(() => {
  const panel = document.querySelector('[data-panel="elements"]');
  if (!panel) return "Open the Codable local demo first.";
  document.querySelector("#wide-demo")?.remove();
  const table = document.createElement("table");
  table.id = "wide-demo";
  table.style.width = "900px";
  table.innerHTML = "<tr><th>Item</th><th>Status</th><th>Owner</th></tr>" +
    "<tr><td>Example page</td><td>Ready to inspect</td><td>Demo</td></tr>";
  panel.append(table);
  return "Added a 900px practice table. Reload to remove it.";
})()`,
        expected: "At a narrow width, the table extends beyond its panel.",
      },
      {
        title: "Measure the overflow",
        paragraphs: [
          "Run this read-only check in Console. The table’s bounding box should extend beyond the layout viewport. The document’s scroll width helps confirm that there is page-level overflow.",
          "For a real page, replace #wide-demo with the element you are investigating. Transforms and intentionally off-screen controls can also extend beyond the viewport, so measurements identify candidates rather than a guaranteed cause.",
        ],
        code: `(() => {
  const table = document.querySelector("#wide-demo");
  const box = table?.getBoundingClientRect();
  return {
    viewport: document.documentElement.clientWidth,
    pageWidth: document.documentElement.scrollWidth,
    tableWidth: box?.width,
    tableRight: box?.right
  };
})()`,
        expected: "The table measures 900 CSS pixels, wider than a narrow phone viewport.",
      },
      {
        title: "Try a fix on the element, then check its parent",
        paragraphs: [
          "Choose Elements → Select, tap a table cell, then reopen Codable. In Tree, move up to the table element with id wide-demo. Open Style, change the width value to 100%, and tap Save. Close the popover and inspect the result; run the measurement again.",
          "This small example has short content, so a fluid width is enough. A real data table may need a wrapper with overflow-x: auto to preserve readable columns. A flex or grid child may need min-width: 0. Long unbroken text may need overflow-wrap: anywhere. Test the cause you found instead of hiding overflow on the entire page, which can conceal content and controls.",
        ],
        expected: "The sample table fits its panel, and page-level sideways scrolling disappears.",
      },
      {
        title: "Verify the fix at neighboring sizes",
        paragraphs: [
          "Make the change in your site’s source, then test just below and above the width where it failed. Codable’s Resize tool can open a page and vary W, H, and Scale or use Presets. Width and height are layout points; Scale changes how the viewport fits on your screen. A DPR setting does not mean the layout is that many times wider.",
          "Resize uses its own WKWebView session. Your Safari login and temporary inspector edits do not carry over. For an authenticated Safari-only bug, stay in that Safari session and compare real window sizes or devices. Use Resize with your development page when you can reproduce its state there.",
        ],
      },
    ],
    checks: [
      { title: "The page still scrolls sideways", text: "Check the parent’s width and padding, then look for another oversized sibling. Images, fixed min-widths, long text, and nested flex or grid layouts are common candidates. Fixing one table may reveal another source of overflow." },
      { title: "The table fits but content is unreadable", text: "Shrinking is not always the right treatment. Keep enough room for the data and try horizontal scrolling on a dedicated table wrapper. Check that the scrollable region can be reached and understood with touch and assistive technology." },
      { title: "Resize behaves differently from Safari", text: "Compare the URL, login state, loaded data, and viewport first. User-agent selection changes signals sent to a site; it does not turn WebKit into Chrome or Firefox. Verify the final fix in the actual browser and device you support." },
    ],
    limits: [
      "A live Style edit is a hypothesis you can test. It does not prove the cause across all content, font sizes, or breakpoints, and it does not change the website’s source files.",
      "CSS layout measurements are not screenshot pixels. Browser zoom, transforms, display scale, and device pixel ratio can affect how measurements appear on screen.",
      "Test large text, long translated content, keyboard appearance, and narrower windows as well as a device preset. A preset alone is not a responsive-layout audit.",
    ],
  },
];

export const CODABLE_GUIDES_INDEX_UPDATED = CODABLE_GUIDES.reduce(
  (latest, guide) => guide.updatedAt > latest ? guide.updatedAt : latest,
  "",
);

export function getCodableGuide(slug: string) {
  return CODABLE_GUIDES.find((guide) => guide.slug === slug);
}
