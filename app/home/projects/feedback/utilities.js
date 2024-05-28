import { createElement } from "react"
import { useId } from "react"
import { motion } from 'framer-motion'

export const parseSvg = async svgURL => {
  console.log(`svgURL: ${svgURL}`)
  const text = await fetch(svgURL, { mode: "no-cors" }).then(res => res.text())

  console.log(`text: ${text}`)

  const svgElementStrings = text.match(/<svg.*?>(.*($[\n\r]^)?)*?<\/svg>/gm)
  console.log(`svgElementStrings: `, svgElementStrings)

  const svgProps = []
  svgElementStrings.forEach(svgElementString => {
    const tagStrings = svgElementString.match(/(?<=<svg.*?\s)([^<]+?="[^<]+?)"(?=\s)/g)
    const dequotedAttributeStrings = []
    tagStrings.forEach(string => {
      dequotedAttributeStrings.push(string.replace(/"/g, ''))
    })

    let entries = []
    dequotedAttributeStrings.forEach(string => {
      console.log(`string: `, string.split(/=/))
      entries.push(string.split(/=/)) 
    })
    entries = entries.map(([key, value]) => [key.replace(/-(\w)/g,(_, $1) => $1.toUpperCase()), value])
    let props = (Object.fromEntries(entries))
    

    console.log(`props: `, props)

    svgProps.push(props)
  })

  console.log(`svgProps:`, svgProps)

  const svgElements = []
  svgProps.forEach((props, index) => {
    const childElementStrings = svgElementStrings[index]
      .match(/<.+?\/>|<.+?>(.+?($[\n\r]^)?)*?<\/.+?>/g)
    console.log(`childElementStrings: `, childElementStrings)
    let children = []
    childElementStrings.forEach(childString => {
      console.log(`childString:`, childString)
      const element = childString.match(/(?<=<).+?(?=\s)/)[0]
      console.log(`element: `, element)
      const attributeString = childString.match(/(?<=\s)(.+?="(.+?($[\n\r]^)?)*?")+?(?=\s?\/?>)/)[0]
      console.log(`attributeString: `, attributeString)
      const attributeStrings = attributeString.split(/(?<=")\s/)
      const dequotedAttributeStrings = []
      attributeStrings.forEach(attributeString => {
        dequotedAttributeStrings.push(attributeString.replace(/"/g, ''))
      })
      const entries = []
      dequotedAttributeStrings.forEach(attributeString => {
        const [key, value] = attributeString.split(/=/)
        entries.push([key.replace(/-(\w)/g, (_, $1) => $1.toUpperCase()), value])
      })
      console.log(`entries: `, entries)

      const childProps = Object.fromEntries(entries)
      // const content = childString.match(/(?<=>)[^<]+/)?.[0]
      // childProps.children = content || null

      console.log(`props: `, childProps)
      children.push({ element, props: childProps })

    })
    svgElements.push({ props, children })
  })

  console.log(`svgElements: `, svgElements)
  return [...svgElements]
}

const motionElementMap = {
  'path': motion.path,
  'circle': motion.circle,
  'g': motion.g,
  'polyline': motion.polyline,
  'line': motion.line,
  'ellipse': motion.ellipse,
  'polygon': motion.polygon,
  'defs':motion.defs,
  'metadata':motion.metadata,
  'linearGradient':motion.linearGradient,
  'stop':motion.stop

}

export const createSvgElement = async ({
  url,
  variants = {},
  animate = 'animate',
  childAnimate='animate',
  width = '288px',
  height = '288px',
  className = '',
  index = 0,
  initial = 'initial',
  x = 0,
  y = 0,
  style = {},
  transformOrigin,
  childTransformOrigin,
  
}) => {

  let svgElement
  const svg = await parseSvg(new URL(url, import.meta.url))
  console.log(`svg: `, svg)
  for (const [svgIndex, { props, children }] of svg.entries()) {
    console.log(`index: ${svgIndex}`)
    const childElements = []
    for (const [key, { element, props: childProps }] of children.entries()) {
      console.log(`index: ${svgIndex} key: ${key}`)
      childElements.push(createElement(motionElementMap[element], { ...childProps, animate:childAnimate, key: crypto.randomUUID()}))
    }

    svgElement = createElement(motion.svg, { ...props, key: crypto.randomUUID(), variants, initial, animate, className: `absolute top-0 left-0 ${className}`, style:{position:'absolute', top:'0', left:'0', overflowY:'visible', width, height, zIndex:40, ...style} }, childElements)

    console.log(`svgElement: `, svgElement)
  }
    return svgElement

}

export const morphSvgs = async (svgURLs) => {

  const svgs = []
  const lengths = []
  svgURLs.forEach(async urlString => {
    const svg = parseSvg(urlString)
    svgs.push(svg)
  })
  console.log(`svgs: `, svgs)

  const paths = []

  svgs.forEach(async (svg, index) => {
    console.log(`svg: `, svg)
    svg = await svg
    const path = await svg[0]
    console.log(`svg[0]: `, path)
    const childPaths = []
    const { children } = path
    console.log(`children: `, children)
    children.forEach(child => {
      if (child.element === 'path') childPaths.push(child)
    })
    console.log(`childPaths.length: `, childPaths.length)
    lengths[index] = childPaths.length
    const pathAttributes = Array(childPaths.length)
    childPaths.forEach((path, index) => {
      console.log(`index: ${index}`)
      pathAttributes[index] = path.props.d
    })

    paths.push(pathAttributes)

  })
  console.log(`paths`, paths)

  morphPaths(lengths, paths)

}

function morphPaths(lengths, paths) {
  const shape1 = [], shape2 = []

  console.log(`lengths: `, lengths)
  lengths.forEach(length => Number(length))
  let maxLength = Math.max(...lengths)

  console.log(`maxLength: `, maxLength)
  console.log(`paths: `, paths)
  for (let i = 0; i < maxLength; i++) {

    shape1.push(paths[0][i % maxLength])
    shape2.push(paths[1][i % maxLength])
  }
}
