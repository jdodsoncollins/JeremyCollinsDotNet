import { compile, run } from "@mdx-js/mdx"
import * as runtime from "react/jsx-runtime"
import { type ComponentType } from "react"

interface MDXModule {
  default: ComponentType
}

export async function compileMDX(source: string): Promise<ComponentType> {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    development: false,
  })

  const { default: Content } = await run(String(compiled), {
    ...runtime,
    baseUrl: import.meta.url,
  }) as MDXModule

  return Content
}
