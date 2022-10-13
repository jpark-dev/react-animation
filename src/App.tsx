import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
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

const Wrapper = styled(motion.div)`
  height: 120vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
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

const startColor = "linear-gradient(135deg,#f2314e,#ea7024)";
const midColor = "linear-gradient(135deg,#cdba2c,#14b711)";
const endColor = "linear-gradient(135deg,#337bd4,#450a79)";

function App() {
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
        <button onClick={() => x.set(-650)}>To Center</button>
        <Box
          style={{ x, rotateZ, backgroundColor: "white" }}
          drag={"x"}
          dragSnapToOrigin
        />
      </BoxWrapper>
    </Wrapper>
  );
}

export default App;
