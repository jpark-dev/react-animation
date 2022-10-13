import { motion } from "framer-motion";
import styled from "styled-components";

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  trans
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: white;
  place-self: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  width: 70px;
  height: 70px;
  border-radius: 40px;
`;

const Wrapper = styled.div`
  height: 100vh;
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

function App() {
  return (
    <Wrapper>
      <Box variants={appearBoxVariant} initial="start" animate="end">
        <Circle variants={circleVariant} />
        <Circle variants={circleVariant} />
        <Circle variants={circleVariant} />
        <Circle variants={circleVariant} />
      </Box>
    </Wrapper>
  );
}

export default App;
