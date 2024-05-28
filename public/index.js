import { useState, useEffect, useRef, createElement } from "react"
import { HappinessPicker } from "@/components/HappinessPicker"
import { parseSvg, createSvgElement, morphSvgs } from "@/utilities"
// const dns = require('node:dns')
// import cowSvg from 'file://localhost/../public/1F42E.svg'

export default function Home() {

  const svgRef = useRef({})

  const svgURLs = [
    '1F42E.svg',
    '1F969.svg'
  ]

  const [svgs, setSvgs] = useState(null)
  if (svgs) console.log(`svgs`, svgs)

  const [svgObj, setSvgObj] = useState()


  const createVariant = (index, duration, delay, postDelay) => {
    const times = Array(postDelay + 6).fill(null).map((_, index) => 1 / (postDelay + 6) * (index + 6))
    const o1 = index % 2 === 0 ? 1 : 0
    const o2 = index % 2 === 0 ? 0 : 1
    const sy = index % 2 === 0 ? -1 : 1
    const t = 3 / 27
    return {
      initial: {
        opacity: 0,
        x: '100vw',
        scaleY: 1
        // transition: { duration, delay },
        // transform: {scale: 2}
      },

      // [0, 0.67, 0.82, 0.86, 1]
      animate: {
        opacity: [o1, o1,o1, o2, o2, 0, 0].concat(Array(postDelay + 6).fill(index % 2 === 0 ? 0 : 1)),
        transition: { duration, delay, repeat: Infinity, times: [0, t * 0.4, t * 0.7, t * 0.83,t * 0.9, t * 0.99, t, ...times]},
        x: ['100vw', '40vw', '40vw', '40vw', '40vw', '3vw','-20vw', ...'-20vw'.repeat(postDelay + 6).split(/(?<=w)(?=-)/)],
        rotateX: ['0deg', '0deg', '0deg', `${sy * 90}deg`,'0deg', '0deg',`0deg`].concat(Array(postDelay + 6).fill('0deg')),
        display:['block', 'block', 'block','block','block','none', 'none', ...'none'.repeat(postDelay + 7).split(/(?<=none)(?=none)/)]
      }
    }
  }

  useEffect(() => {

    (async () => {
      const { protocol, hostname, port } = window.location
      const url = `${protocol}//${hostname}:${port}/`
      console.log(`url: ${url}`)
      const variants = [createVariant(0, 27, 2, 24), createVariant(1, 27, 2, 24)]
      console.log(`variants: `, variants)
      const cowSvg = await createSvgElement({ url: `${url}1F42E.svg`, variants: variants[0], width: '288px', height: '288px' })
      console.log(`cowSvg: `, cowSvg)
      const meatSvg1 = await createSvgElement({ url: `${url}1F969.svg`, variants: variants[1] })
      const rabbitSvg = await createSvgElement({ url: `${url}1F430.svg`, variants: createVariant(2, 27, 5, 24) })
      const meatSvg2 = await createSvgElement({ url: `${url}1F969.svg`, variants: createVariant(3, 27, 5, 24) })
      const bearSvg = await createSvgElement({ url: `${url}1F43B.svg`, variants: createVariant(4, 27, 8, 24) })
      const meatSvg3 = await createSvgElement({ url: `${url}1F969.svg`, variants: createVariant(5, 27, 8, 24) })
      const lionSvg = await createSvgElement({ url: `${url}1F981.svg`, variants: createVariant(6, 27, 11, 24) })
      const meatSvg4 = await createSvgElement({ url: `${url}1F969.svg`, variants: createVariant(7, 27, 11, 24) })
      const pandaSvg = await createSvgElement({ url: `${url}1F43C.svg`, variants: createVariant(8, 27, 14, 24) })
      const meatSvg5 = await createSvgElement({ url: `${url}1F969.svg`, variants: createVariant(9, 27, 14, 24) })
      const koalaSvg = await createSvgElement({ url: `${url}1F428.svg`, variants: createVariant(10, 27, 17, 24) })
      const meatSvg6 = await createSvgElement({ url: `${url}1F969.svg`, variants: createVariant(11, 27, 17, 24) })
      const monkeySvg = await createSvgElement({ url: `${url}1F435.svg`, variants: createVariant(12, 27, 20, 24) })
      const meatSvg7 = await createSvgElement({ url: `${url}1F969.svg`, variants: createVariant(13, 27, 20, 24) })
      const frogSvg = await createSvgElement({ url: `${url}1F438.svg`, variants: createVariant(14, 27, 23, 24) })
      const meatSvg8 = await createSvgElement({ url: `${url}1F969.svg`, variants: createVariant(15, 27, 23, 24) })
      const unicornSvg = await createSvgElement({ url: `${url}1F984.svg`, variants: createVariant(16, 27, 26, 24) })
      const meatSvg9 = await createSvgElement({ url: `${url}1F969.svg`, variants: createVariant(17, 27, 26, 24) })

      const crossHairAnimate = {

        opacity: [0, 1, 1, 1, 1, 1, 1, 0],
        x: ['0vw', '49vw', '45vw', '45vw', '45vw', '45vw', '45vw', '45vw'],
        y: ['0vw', '0vw', '4.5vw', '5vw', '5vw', '5vw', '5vw', '-50vw'],
        transition: { repeat: Infinity, duration: 3, delay: 2, times: [0, 0.25, 0.47, 0.48, 0.499, 0.51, 0.75, 1.0] },
      }

      const crossHairChildAnimate = {
        fill: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ff0000', '#ff0000', '#ffffff'],
        transition: { duration: 3, delay: 2, repeat: Infinity, times: [0, 0.25, 0.49, 0.5, 0.75, 1.0] }
      }

      const crossHairSvg = await createSvgElement({ url: `${url}aim-svgrepo-com.svg`, childAnimate: crossHairChildAnimate, animate: crossHairAnimate, width: '144px', height: '144px' })

      const bloodWidth = 3
      const bloodHeight = 3
      const bloodX = 47
      const bloodY = 7
      const scale1 = 0.05
      const scale2 = 0.2
      const bloodVariants = {
        initial: {
          x: `${bloodX - 0.1 * bloodWidth * 0.5}vw`,
          y: `${bloodY - 0.1 * bloodHeight * 0.5}vw`,
          // transform:{translateX:bloodX, translateY:bloodY},
          originZ: 0
          // width:`${bloodWidth}vw`,
          // height:`${bloodHeight}vw`
        },
        animate: {
          x: [...`${bloodX - 0.1 * bloodWidth * 0.5}vw`.repeat(3).split(/(?<=w)(?=\d)/), `${bloodX - scale1 * bloodHeight * 0.5}vw`, `${bloodX - scale1 * bloodHeight * 0.5}vw`],
          y: [...`${bloodY - 0.1 * bloodHeight * 0.5}vw`.repeat(3).split(/(?<=w)(?=\d)/), `${bloodY - scale1 * bloodHeight * 0.5}vw`],
          opacity: [0, 0, 1, 1, 0],
          transition: { duration: 3, delay: 2, repeat: Infinity, times: [0, 0.6, 0.62, 0.64, 0.8] },
          scale: [0.05, 0.05, 0.05, scale1, scale1, scale1],
        }
      }

      const bloodSvg = await createSvgElement({ url: `${url}Give_Blood.svg`, variants: bloodVariants, width: `${bloodWidth}vw`, height: `${bloodHeight}vw`, className: 'overflow-y-visible' })

      console.log(`bloodSvg: `, bloodSvg)

      const elements = [cowSvg, meatSvg1, rabbitSvg, meatSvg2, bearSvg, meatSvg3, lionSvg, meatSvg4, pandaSvg, meatSvg5, koalaSvg, meatSvg6, monkeySvg, meatSvg7, frogSvg, meatSvg8, unicornSvg, meatSvg9, bloodSvg, crossHairSvg]
      console.log(`elements: `, elements)
      setSvgs(elements)

      const times = [0, 0.67, 0.82, 0.86, 1]
      const duration = 3
      const delay = 2.3
      const rotateY = ['0deg', '0deg', '85deg', '85deg', '0deg']

      const cowboyAnimate = {
        transition: { duration, delay, repeat: Infinity, times },
        y: ['0vw', '0vw', '-2vw', '0vw', '0vw'],
        scaleY: [1.25, 1.25, 2, 1.25, 1.25],
        scaleX: [1, 1, 4, 1, 1],
        originY: '0',
        rotateY
      }

      const cowboySvg = await createSvgElement({ url: `${url}1F920.svg`, animate: cowboyAnimate, initial: { x: '-2vw', scaleX: 1,  }})

      const cowboyEyesAnimate = {
        transition: { duration, delay, repeat: Infinity, times },
        // rotateZ: ['0deg', '0deg', '360deg', '361deg'],
        y: ['0vw', '0vw', '-13vw', '0vw', '0vw'],
        scaleY: [1.25, 1.25, 0.6, 1.25, 1.25],
        scaleX: [1, 1, 0.8, 1, 1],
        originY: '0',
        rotateY
      }

      const cowboyEyesSvg = await createSvgElement({ url: `${url}cowboy-eyes.svg`, animate: cowboyEyesAnimate, initial: { x: '-2vw', scaleX: 1 } })

      const cowboyMouthOutlineAnimate = {
        transition: { duration, delay, repeat: Infinity, times },
        scaleY: [1.25, 1.25, 6, 1.25, 1.25],
        scaleX: [1, 1, 4, 1, 1],
        y: ['10vw', '10vw', `25vw`, '10vw', '10vw'],
        rotateY
      }

      const cowboyMouthTopAnimate = {
        transition: { duration, delay, repeat: Infinity, times },
        // scaleY: [1.25, 1.25, 5, 1.25, 1.25],
        scaleX: [1, 1, 4, 1, 1],
        y: ['10vw', '10vw', `-5vw`, '10vw', '10vw'],
        rotateY
      }

      const cowboyMouthBottomAnimate = {
        transition: { duration, delay, repeat: Infinity, times },
        // scaleY: [1.25, 1.25, 5, 1.25, 1.25],
        scaleX: [1, 1, 2, 1, 1],
        y: ['9vw', '9vw', `13vw`, '9vw', '9vw'],
        rotateY
      }

      const cowboyMouthTopSvg = await createSvgElement({
        url: `${url}cowboy-mouth-top.svg`, animate: cowboyMouthTopAnimate, initial: {
          x: '-2vw', y: '8vw', scaleX: 1, scaleY: 1.25, style: {
            originY: 0.75, originX: 0.5, originZ: 0
          }
        }
      })

      const cowboyMouthBottomSvg = await createSvgElement({
        url: `${url}cowboy-mouth-bottom.svg`, animate: cowboyMouthBottomAnimate, initial: {
          x: '-2vw', y: '10vw', scaleX: 1, style: {
            originY: 0.75, originX: 0.5, originZ: 0
          }
        }
      })

      const cowboyMouthOutlineSvg = await createSvgElement({
        url: `${url}cowboy-mouth-outline.svg`, animate: cowboyMouthOutlineAnimate, initial: {
          x: '-2vw', y: '10vw', scaleX: 1, style: {
            originY: 0.75, originX: 0.5, originZ: 0
          }
        }
      })

      const trollFaceAnimate = {
        transition: { duration: 3, delay: 2, repeat: Infinity, times: [0, 0.85, 0.9, 1] },
        scaleY: [.1, .1, .2, .1],

      }

      const cowboyHatAnimate = {
        transition: { duration: 3, delay, repeat: Infinity, times: [0, 0.67, 0.82, 1] },
        y: ['-7vw', '-7vw', '-20vw', '-7vw'],
        rotateZ: ['0deg', '0deg', '-360deg', '-720deg']
      }

      const cowboyHatSvg = await createSvgElement({ url: `${url}cowboy-hat.svg`, animate: cowboyHatAnimate, initial: { x: '-2vw', scale: 1 } })

      console.log(`cowboyHatSvg: `, cowboyHatSvg)
      // const trollFaceSvg = await createSvgElement({url:`${url}cf9d0170-4617-4dc9-be46-49be105ee772_pixelied-jesus.svg`, animate: trollFaceAnimate, initial:{y:'10vw'}, width:'288px', height:'288px'})

      // console.log(`trollFaceSvg: `, trollFaceSvg)
      setSvgObj({ ...svgObj, cowboySvg, cowboyHatSvg, cowboyEyesSvg, cowboyMouthTopSvg, cowboyMouthBottomSvg, cowboyMouthOutlineSvg })

    })()

  }, [])

  const [score, setScore] = useState(0)
  const scoreArr = Array(3).fill(0)
  const [scores, setScores] = useState(scoreArr);
  console.log(score)

  const updateScore = (index, value) => {
    console.log(`updateScore  index: ${index} value: ${value}`);
    setScores(scores.toSpliced(index, 1, value))
    console.log(`scores:`, scores)
    const newScore = scores.toSpliced(index, 1, value).reduce((n1, n2) => n1 + n2)
    console.log(`newScore:`, newScore)
    setScore(newScore)

  }

  return (
    <main className="bg-black m-0 w-[100vw] overflow-x-hidden h-[100vh] font-[HoltwoodOneSC-Regular]">
      <div className="flex-col w-full h-full bg-black relative m-0">
        <div className="flex-col text-center text-white mb-8 text-8xl line-height-2 leading-none">
          <div className='flex-col relative justify-center'>
            <div className='flex-col justify-evenly'>
              <h1 className='my-0'><small>THE</small></h1>
              <h1 className='my-0'>TEXAS RANCHER</h1>
            </div>
          </div>
          <h2 className='relative text-7xl z-50 text-red-500 my-0'>"If we can kill it, we'll grill it!"</h2>
          <div className='relative flex h-[288px] mx-auto z-40 overflow-y-visible'>
            <div className=''/>
            <div className='absolute top-0 left-0 flex-col justify-center  z-0  m-auto overflow-y-visible'>
              {svgObj?.cowboySvg && svgObj.cowboySvg}
            </div>
            <div className='absolute z-10 top-0 left-0'>
              {svgObj?.cowboyEyesSvg && svgObj.cowboyEyesSvg}
            </div>
            <div className='absolute top-0 z-10 left-0'>
              {svgObj?.cowboyHatSvg && svgObj.cowboyHatSvg}
            </div>
            <div className='absolute top-0 left-0 z-20'>
              {svgObj?.cowboyMouthOutlineSvg && svgObj.cowboyMouthOutlineSvg}
            </div>
            <div className='absolute z-30 top-0 left-0'>
              {svgObj?.cowboyMouthTopSvg && svgObj.cowboyMouthTopSvg}
            </div>
            <div className='absolute z-30 top-0 left-0'>
              {svgObj?.cowboyMouthBottomSvg && svgObj.cowboyMouthBottomSvg}
            </div>
            <div className='absolute z-40 top-0 left-0 w-8/12 h-[288px]  overflow-y-visible mx-auto' >
              {svgs && svgs}
            </div>
          </div>
        </div>
        <div className="text-center text-white my-12 text-5xl">
          <h1 className={`font-['HoltwoodOneSC-Regular]`} style={{ fontFamily: 'HoltwoodOneSC-Regular' }}>
            LET US KNOW HOW WE'RE DOIN'! 🤠
          </h1>
        </div>
        <div className="relative flex-col w-full bg-contain  text-5xl text-white  z-10" style={{ backgroundImage: 'url(https://i.imgur.com/MJrMoi5.jpg)', backgroundSize: '100%', backgroundPositionY: '-100%' }}>
          <div className="flex-col text-center">
            <h1 className=" w-full py-8">
              Food
            </h1>
            <HappinessPicker {...{ updateScore, pickerIndex: 0 }} />
          </div>
          <div className="flex-col text-center">
            <h1 className="mx-8 my-8" >
              Service
            </h1>
            <HappinessPicker {...{ updateScore, pickerIndex: 1 }} />
          </div>
          <div className="flex-col text-center">
            <h1 className="mx-8 my-8">
              Value for Money
            </h1>
            <HappinessPicker {...{ updateScore, pickerIndex: 2 }} />
          </div>
          <div className="text-right mx-8 my-8">
            <h1>
              TOTAL: {score} / {scores.length * 4}
            </h1>
          </div>
        </div>
        <div className="text-center text-white pb-8 text-6xl">
          <h1>
            Y'ALL COME BACK NOW! 🤠
          </h1>
        </div>
      </div>
    </main >
  )
}
