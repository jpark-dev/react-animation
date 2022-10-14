import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import styled from "styled-components";

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const SingleItemBox = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

const BoxWrapper = styled(motion.div)`
  width: 100vw;
  height: 50vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background-color: white;
  place-self: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  width: 70px;
  height: 70px;
  border-radius: 40px;
`;

const LayoutBox = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const LayoutCircle = styled(motion.div)`
  background-color: #00a4ff;
  height: 100px;
  width: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Svg = styled.svg`
  padding: 25px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

const Wrapper = styled(motion.div)`
  height: 150vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const myVariants = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: { type: "spring", delay: 0.3 } },
};

const appearBoxVariant = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const circleVariant = {
  start: { scale: 0, opacity: 0, y: 20 },
  end: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.5 },
  },
};

const gestureVariant = {
  hover: { scale: 1.5, rotateZ: 180 },
  click: { scale: 1, borderRadius: "100px" },
};

const dragVariant = {
  ...gestureVariant,
  drag: { backgroundColor: "rgb(50, 50, 75)", transition: { duration: 3 } },
};

const svgVariant = {
  start: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  end: {
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
  },
};

const toggleVariant = {
  initial: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, rotateZ: 360 },
  leaving: { opacity: 0, scale: 0, y: 20 },
};

const sliderVariant = {
  entry: (toRight: boolean) => ({
    x: toRight ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: (toRight: boolean) => ({
    x: toRight ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.2 },
  }),
};

const startColor = "linear-gradient(135deg,#f2314e,#ea7024)";
const midColor = "linear-gradient(135deg,#cdba2c,#14b711)";
const endColor = "linear-gradient(135deg,#337bd4,#450a79)";

function App() {
  const [showing, setShowing] = useState(false);
  const [visible, setVisible] = useState(1);
  const [toRight, setToRight] = useState(false);
  const [clicked, setClicked] = useState(false);

  const incrementVisible = () => {
    setToRight(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const decrementVisible = () => {
    setToRight(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const toggleShowing = () => setShowing((prev) => !prev);
  const toggleClick = () => setClicked((prev) => !prev);

  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-1400, 150], [-360, 360]);
  const bgGradient = useTransform(
    x,
    [-1400, -650, 150],
    [startColor, midColor, endColor]
  );
  const { scrollYProgress } = useScroll();
  const scrollYScale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  return (
    <Wrapper style={{ background: bgGradient }}>
      <BoxWrapper style={{ scale: scrollYScale }}>
        <Box
          style={{ backgroundColor: "white" }}
          variants={myVariants}
          initial="start"
          animate="end"
        />
        <Box variants={appearBoxVariant} initial="start" animate="end">
          <Circle variants={circleVariant} />
          <Circle variants={circleVariant} />
          <Circle variants={circleVariant} />
          <Circle variants={circleVariant} />
        </Box>
        <Box
          style={{ backgroundColor: "white" }}
          variants={gestureVariant}
          whileHover="hover"
          whileTap="click"
        />
        <SingleItemBox ref={biggerBoxRef}>
          <Circle
            drag
            dragSnapToOrigin
            dragElastic={0.3}
            dragConstraints={biggerBoxRef}
            style={{ borderRadius: "20px" }}
            variants={dragVariant}
            whileHover="hover"
            whileTap="click"
            whileDrag="drag"
          />
        </SingleItemBox>
      </BoxWrapper>
      <BoxWrapper>
        <button onClick={() => x.set(-650)}>To Center</button>
        <Box
          style={{ x, rotateZ, backgroundColor: "white" }}
          drag={"x"}
          dragSnapToOrigin
        />
        <SingleItemBox>
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <motion.path
              variants={svgVariant}
              initial="start"
              animate="end"
              transition={{
                default: {
                  duration: 5,
                },
                fill: { duration: 2, delay: 3 },
              }}
              d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
            />
          </Svg>
        </SingleItemBox>
        <button onClick={toggleShowing}>Toggle</button>
        <AnimatePresence>
          {showing ? (
            <Box
              variants={toggleVariant}
              initial="initial"
              animate="visible"
              exit="leaving"
            />
          ) : null}
        </AnimatePresence>
      </BoxWrapper>
      <BoxWrapper>
        <AnimatePresence exitBeforeEnter custom={toRight}>
          <SingleItemBox
            style={{ position: "absolute" }}
            custom={toRight}
            variants={sliderVariant}
            initial="entry"
            animate="center"
            exit="exit"
            key={visible}
          >
            {visible}
          </SingleItemBox>
        </AnimatePresence>
      </BoxWrapper>
      <button onClick={decrementVisible}>previous</button>
      <button onClick={incrementVisible}>next</button>
      <BoxWrapper onClick={toggleClick}>
        <LayoutBox>
          {!clicked ? <LayoutCircle layoutId="circle" style={{ borderRadius: 50 }}/> : null}
        </LayoutBox>
        <LayoutBox>
          {clicked ? (
            <LayoutCircle layoutId="circle" style={{ borderRadius: 0 }} />
          ) : null}
        </LayoutBox>
      </BoxWrapper>
    </Wrapper>
  );
}

export default App;
