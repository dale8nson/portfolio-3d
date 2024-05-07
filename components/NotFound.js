'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from "next/navigation"

const Cursor = ({ visible }) => {
  return (
    <>
      {visible && <div className='w-[.6em] h-[1em] animate-pulse translate-x-[-1.3em] translate-y-[0.3em] bg-green-500' />}
    </>
  )
}

export const NotFound = ({ id }) => {
  const router = useRouter()
  const path = useRef(null)

  const [delay, setDelay] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [cursor1, setCursor1] = useState(true)
  const [cursor2, setCursor2] = useState(false)
  const [cursor3, setCursor3] = useState(false)
  const [cursor4, setCursor4] = useState(false)
  const [cursor5, setCursor5] = useState(false)
  const [prompt, setPrompt] = useState(false)
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [typeCommand1, setTypeCommand1] = useState(false)
  const [typeCommand2, setTypeCommand2] = useState(false)
  const [response1Text, setResponse1Text] = useState('')
  const [response2Text, setResponse2Text] = useState('')
  const [typeResponse1, setTypeResponse1] = useState(false)
  const [typeResponse2, setTypeResponse2] = useState(false)
  const [goBack, setGoBack] = useState(false)
  const [moves, setMoves] = useState(0)

  const command1 = `go to ${id} \t`
  const response1 = `You can't go that way.\t`
  const command2 = "go back "
  const response2 = "You go back the way you came. "


  useEffect(() => {
    // path.current = id.replace(/(.+?\/)*(.*$)/, `$1${id}`)
    path.current = id
    setDelay(true)
  }, [])

  let timeout

  if (delay) {
    timeout = setTimeout(() => {
      setIsAnimating(true)
      setDelay(false)
    }, 3000)
  }

  if (isAnimating) {
    setTimeout(() => {
      setTypeCommand1(true)
      setIsAnimating(false)
    }, 700)
  }

  if (typeCommand1) {
    // type({text:command1, into:text1, set:setText1})
    if (text1.length < command1.length) {
      timeout = setTimeout(() => {
        setText1(command1.slice(0, text1.length + 1))
        // clearTimeout(timeout)
      }, 300)
    } else {

      timeout = setTimeout(() => {
        setCursor1(false)
        setCursor2(true)
        setMoves(moves + 1)
        setTypeCommand1(false)
        // clearTimeout(timeout)

      }, 400)
    }
  }

  if (cursor2) {

    setTimeout(() => {
      setTypeResponse1(true)
    }, 700)
  }

  if (typeResponse1) {
    if (response1Text.length < response1.length) {
      timeout = setTimeout(() => {
        setResponse1Text(response1.slice(0, response1Text.length + 1))
      }, 5)
    } else setTimeout(() => {
      setCursor2(false)
      setTypeResponse1(false)
      setPrompt(true)
      setCursor3(true)
    }, 400)
  }

  if (cursor3) {
    setTimeout(() => {
      setTypeCommand2(true)
    }, 1500)
  }

  if (typeCommand2) {
    if (text2.length < command2.length) {
      timeout = setTimeout(() => {
        setText2(command2.slice(0, text2.length + 1))
        clearTimeout(timeout)
      }, 300)
    } else {
      setTimeout(() => {
        setTypeCommand2(false)
        setMoves(moves + 1)
        setCursor3(false)
        setCursor4(true)

      }, 400)
    }
  }

  if (cursor4) {
    setTimeout(() => {
      setTypeResponse2(true)
    }, 700)
  }

  if(typeResponse2) {
    if (response2Text.length < response2.length) {
      timeout = setTimeout(() => {
        setResponse2Text(response2.slice(0, response2Text.length + 1))
      }, 5)
    } else setTimeout(() => {
      setCursor4(false)
      setCursor5(true)
      setTypeResponse2(false)
      setGoBack(true)
    }, 400)
  }
  if(goBack) {
    setInterval(() => router.back(), 700)
  }

  return (
    <>
      {id && <div className='text-green-500 m-0 text-2xl w-full h-[100vh] flex-col justify-items-center items-baseline p-4 leading-9 font-[retro]' style={{backgroundImage:'repeating-linear-gradient(to bottom, #000000 10px, rgb(0, 43, 5) 13px, #000000 10px'}}>
        <div className='bg-green-500 text-green pb-[2px] pt-[4px] px-[3px] mb-4  text-green-950 w-full flex justify-between'>
          <p className='mx-2'>WEST OF HOUSE</p>
          <div className='flex justify-between'>
            <p className='mx-4'>SCORE 0</p>
            <p className='mx-4'>MOVES: {moves} </p>
          </div>
        </div>
        <div className='mx-2'>
        <p>ZORK I: The Great Underground Empire</p>
        <p>Copyright (c) 1981, 1982, 1983 Infocom, Inc. All rights reserved.</p>
        <p>ZORK is a registered trademark of Infocom, Inc.</p>
        <p>Revision 88 / Serial number 840726</p> <br />
        <p>West of House</p>
        <p>You are standing in an open field west of a white house, with a boarded front door.</p>
        <p>There is a small mailbox here.</p>
        </div>
        <br />
        <div className='flex mx-2'>
          <p className='mb-4 mx-2'>&gt;&nbsp;{text1}&nbsp;&nbsp;</p>
          <Cursor visible={cursor1} />
        </div>
        <div className='flex mx-2'>
          <p className='mb-4 mx-2'>{response1Text}&nbsp;&nbsp;</p>
          <Cursor visible={cursor2} /> <br/>
        </div>
        {prompt && <div className='flex mx-2'>
          <p className='mb-4 mx-2'>&gt;&nbsp;{text2}&nbsp;&nbsp;</p>
          <Cursor visible={cursor3} />
        </div>}
        <div className='flex mx-2'>
          <p className='mb-4 mx-2'>{response2Text}&nbsp;&nbsp;</p>
          <Cursor visible={cursor4} />
        </div>
        <Cursor visible={cursor5} />
      </div>}
    </>
  )
}