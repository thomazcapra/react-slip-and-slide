import { type ReactSlipAndSlideRef } from '@react-slip-and-slide/models';
import React from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { ReactSlipAndSlide } from 'react-slip-and-slide';

const App = () => {
  const [edges, setEdges] = React.useState<{ start: boolean; end: boolean }>({
    start: false,
    end: false,
  });
  const [index, setIndex] = React.useState<number>(0);

  const memoData = React.useMemo(() => {
    return [
      { width: 300 },
      { width: 200 },
      { width: 100 },
      { width: 200 },
      { width: 320 },
      { width: 100 },
      { width: 320 },
      { width: 200 },
      { width: 200 },
      { width: 280 },
    ];
  }, []);

  const ref = React.useRef<ReactSlipAndSlideRef>(null);

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 32 }}>{index}</Text>
      <Text style={{ fontSize: 22 }}>{JSON.stringify(edges)}</Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <ReactSlipAndSlide
          ref={ref}
          data={memoData}
          // snap
          // centered
          // infinite
          // itemWidth={320}
          // itemHeight={200}
          // interpolators={{
          //   opacity: 0.6,
          //   scale: 0.9,
          // }}
          onChange={setIndex}
          onEdges={setEdges}
          renderItem={({ index: _index, item: { width } }) => {
            return (
              <View
                style={{
                  width,
                  height: 200,
                  backgroundColor: '#58a8d9',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 20 }}>{_index}</Text>
              </View>
            );
          }}
        />
      </View>
      <Button title="Next" onPress={() => ref.current?.next()} />
      <Button title="Prev" onPress={() => ref.current?.previous()} />
      <Button title="Move:Next" onPress={() => ref.current?.move(-200)} />
      <Button title="Move:Prev" onPress={() => ref.current?.move(200)} />
      <Button
        title="GoTo"
        onPress={() => ref.current?.goTo({ index: 3, animated: false })}
      />
    </SafeAreaView>
  );
};

export default App;
