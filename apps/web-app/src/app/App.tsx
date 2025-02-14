import styled from 'styled-components';
import {
  ReactSlipAndSlide,
  type ReactSlipAndSlideRef,
  type ReactSlipAndSlideProps,
} from 'react-slip-and-slide';
import React from 'react';
import { Example } from './Example';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 200vh;
  /* background-color: #0f0f0f; */
  align-items: center;
`;

const data = [
  { width: 400 },
  { width: 400 },
  { width: 400 },
  { width: 400 },
  { width: 400 },
  { width: 400 },
  { width: 400 },
  { width: 400 },
  { width: 400 },
  { width: 400 },
  // { width: 400 },
  // { width: 400 },
  // { width: 400 },
  // { width: 400 },
  // { width: 400 },
  // { width: 400 },
  // { width: 400 },
  // { width: 400 },
  // { width: 400 },
  // { width: 400 },
  // { width: 400 },
];

const props0: ReactSlipAndSlideProps<{ width: number }> = {
  _testId: 'fixed',
  data,
  snap: true,
  centered: true,
  infinite: true,
  pressToSlide: true,
  itemWidth: 400,
  itemHeight: 100,
  interpolators: {
    opacity: 0.4,
    scale: 0.82,
  },
  renderItem: ({ index, item: { width } }) => {
    return (
      <div
        style={{
          width,
          height: 100,
          backgroundColor: '#767676',
          color: '#000000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '32px',
          userSelect: 'none',
        }}
      >
        <p className="item-text">{index}</p>
      </div>
    );
  },
};

const props1: ReactSlipAndSlideProps<{ width: number }> = {
  ...props0,
  infinite: false,
};

const props2: ReactSlipAndSlideProps<{ width: number; height: number }> = {
  ...props1,
  _testId: 'dynamic_same_width',
  data: [
    { width: 400, height: 100 },
    { width: 400, height: 200 },
    { width: 400, height: 100 },
    { width: 400, height: 300 },
    { width: 400, height: 100 },
    { width: 400, height: 200 },
  ],
  useWheel: true,
  centered: true,
  itemWidth: undefined,
  itemHeight: undefined,
  renderItem: ({ index, item: { width, height } }) => {
    return (
      <div
        style={{
          width,
          height,
          backgroundColor: '#858585',
          color: '#000000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '32px',
          userSelect: 'none',
        }}
      >
        <p className="item-text">{index}</p>
      </div>
    );
  },
};

const props3: ReactSlipAndSlideProps<{ width: number }> = {
  ...props1,
  _testId: 'dynamic_MULTI_width',
  data: [
    { width: 800 },
    { width: 200 },
    { width: 300 },
    { width: 400 },
    { width: 500 },
    { width: 800 },
  ],
  centered: true,
  itemWidth: undefined,
  itemHeight: undefined,
};

const props4: ReactSlipAndSlideProps<{ width: number }> = {
  ...props1,
  centered: false,
  interpolators: undefined,
};

export function App() {
  const ref = React.useRef<ReactSlipAndSlideRef>(null);

  const [currIndex, setCurrIndex] = React.useState<number>(0);

  return (
    <StyledApp style={{ backgroundColor: '#0f0f0f' }}>
      <div style={{ height: 0 }} />
      <Example />
    </StyledApp>
  );

  return (
    <React.Fragment>
      <ReactSlipAndSlide
        ref={ref}
        data={data}
        snap
        centered
        itemWidth={400}
        itemHeight={200}
        useWheel
        // pressToSlide
        onItemPress={({ currentIndex, pressedItemIndex }) => {
          if (pressedItemIndex > currentIndex) {
            ref.current?.next();
          } else if (pressedItemIndex < currentIndex) {
            ref.current?.previous();
          }
        }}
        onChange={(i) => {
          setCurrIndex(i);
        }}
        renderItem={({ index, item: { width } }) => {
          return (
            <div
              style={{
                width: 400,
                height: 200,
                backgroundColor: '#85858573',
                color: '#000000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '32px',
                userSelect: 'none',
              }}
            >
              <p className="item-text">{index}</p>
            </div>
          );
        }}
      />
      <button onClick={() => ref.current?.previous()}>Prev</button>
      <button onClick={() => ref.current?.next()}>Next</button>
      <button onClick={() => ref.current?.goTo({ index: 3, animated: true })}>
        Go To 3
      </button>
      <h1>{currIndex}</h1>
    </React.Fragment>
  );

  return (
    <StyledApp>
      <p>infinite</p>
      <ReactSlipAndSlide {...props0} />

      <p>fixed</p>
      <ReactSlipAndSlide {...props1} visibleItems={10} />

      <p>dynamic (same width)</p>
      <ReactSlipAndSlide {...props2} />

      <p>dynamic (multi width)</p>
      <ReactSlipAndSlide {...props3} />

      <p>align-start</p>
      <ReactSlipAndSlide {...props4} />
    </StyledApp>
  );
}

export default App;
