'use client'
import { useRef, useEffect } from 'react'
import { extend } from '@react-three/fiber'
import { Root, Container, FontFamilyProvider, Text } from '@react-three/uikit'
import { useRouter } from 'next/navigation'
import { Button } from '/components/uikit/default/button'


export const MainMenu = ({onClick: parentClickHandler, onPointerOver, onPointerOut}) => {

  const router = useRouter()

  const buttonRef = useRef(null)

  useEffect(() => {
    if(!buttonRef.current) return
    console.log('buttonRef.current: ', buttonRef.current)
  })

  const onAboutClick = e => {
    router.push('/home/about')
  }

  const onResumeClick = e => {
    router.push('/home/resume')
  }

  const onProjectsClick = e => {
    router.push('/home/projects')
  }

  const onContactClick = e => { 
    router.push('/home/contact')
  }

  return (<FontFamilyProvider
    nasa={{
      normal: '/NasalizationRg-Regular-msdf/NasalizationRg-Regular-msdf.json'
    }}
    led={{ normal: '/The Led Display St-msdf/The Led Display St-msdf.json' }}
  >
    <Root name='menu' sizeX={0.45} sizeY={0.48}
      transformTranslateZ={350}
      borderRadius={1}
      marginX={0} 
      backgroundColor={0x336633}
      borderColor={0x338833}
      border={6}
      borderStyle='solid'
      flexDirection='column' backgroundOpacity={0.5} ref={buttonRef} >
      <Container justifyItems='center' height={40} marginY={2} marginX='auto'>
        <Text color={0x338833} fontSize={6} fontFamily='led'>WELCOME</Text>
      </Container>
      <Container margin={0} backgroundOpacity={0} flexDirection='column' flexGrow={1} gapRow={-10} alignItems='flex-start' >
        <Button variant='link' marginLeft={2} padding={0} onClick={onAboutClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut}   >
          <Text color={0x338833} hover={{color:0x33cc33}} fontSize={6} fontFamily='nasa' >About</Text>
        </Button>
        <Button variant='link' margin={2} padding={0} onClick={onResumeClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut} >
          <Text color={0x338833} hover={{color:0x33cc33}} fontSize={6} fontFamily='nasa'>Resume</Text>
        </Button>
        <Button variant='link' margin={2} padding={0} onClick={onProjectsClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut} >
          <Text color={0x338833} hover={{color:0x33cc33}} fontSize={6} fontFamily='nasa'>Projects</Text>
        </Button>
        <Button variant='link' margin={2} padding={0} onClick={onContactClick} onPointerOver={onPointerOver} onPointerOut={onPointerOut} >
          <Text color={0x338833} hover={{color:0x33cc33}} fontSize={6} fontFamily='nasa'>Contact</Text>
        </Button>
      </Container>
    </Root>
  </FontFamilyProvider>)
}