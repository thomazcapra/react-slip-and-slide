import { type BaseDimensions, type BoxRef } from '@react-slip-and-slide/models';
import { defer, times } from 'lodash';
import React from 'react';
import { Context } from '../context';
import { getDynamicRangeSum } from './helpers';

export const useDynamicDimension = () => {
  const {
    state: { dataLength, itemDimensionMode },
    actions: { setItemDimensionMap, setRanges },
  } = Context.useDataContext();

  const itemRefs = React.useMemo<Array<React.RefObject<BoxRef>>>(() => {
    if (itemDimensionMode === 'dynamic') {
      return times(dataLength, () => React.createRef());
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLength]);

  const measure = React.useCallback(() => {
    return new Promise<BaseDimensions[]>((res) => {
      defer(() => {
        const promises = itemRefs.map((ref) => ref.current?.measure());
        Promise.all(promises).then((measurements) => {
          res(
            measurements?.map((itemMeasurements) => ({
              width: itemMeasurements?.width || 0,
              height: itemMeasurements?.height || 0,
            }))
          );
        });
      });
    });
  }, [itemRefs]);

  React.useEffect(() => {
    if (itemDimensionMode === 'dynamic') {
      measure().then((itemDimensionMap) => {
        setItemDimensionMap(itemDimensionMap);
        setRanges(getDynamicRangeSum(itemDimensionMap));
      });
    }
  }, [dataLength, itemDimensionMode, measure, setItemDimensionMap, setRanges]);

  return {
    itemRefs,
  };
};
