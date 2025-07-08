'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CircleGrid from '@/components/ui/circle-grid';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  selectWatchColor,
  selectWatchFace,
  selectWatchStrap,
  setWatchColor,
  setWatchFace,
  setWatchStrap,
} from '@/lib/store/features/watch/watchSlice';
import ColorSection from '@/components/ui/color-section';
import { watchFaces, watchStraps } from '@/lib/data';

const WatchMenu = () => {
  const dispatch = useAppDispatch();

  const colorChangeHandler = (value) => {
    dispatch(setWatchColor(value));
  };

  const faceClickHandler = (item) => {
    dispatch(setWatchFace(item?.value));
  };

  const strapClickHandler = (item) => {
    dispatch(setWatchStrap(item?.value));
  };

  const watchFace = useAppSelector(selectWatchFace);
  const watchStrap = useAppSelector(selectWatchStrap);
  const watchColor = useAppSelector(selectWatchColor);

  return (
    <div className="bg-transparent rounded-xl">
      <Tabs defaultValue="colors" style={{ minWidth: '350px' }}>
        <TabsList 
          className="p-6 bg-primary/30"
          style={{
            borderRadius: "30px",
          }}
        >
          <TabsTrigger value="colors"  className="px-3 py-3 rounded-full bg-transparent text-primary-foreground"  >Colors</TabsTrigger>
          <TabsTrigger value="faces"  className="px-3 py-3 rounded-full bg-transparent text-primary-foreground"  >Faces</TabsTrigger>
          <TabsTrigger value="straps"  className="px-3 py-3 rounded-full bg-transparent text-primary-foreground"  >Straps</TabsTrigger>
        </TabsList>
        <div 
         style={{
          borderRadius: "30px",
        }}
        className="card-gradient p-4 shadow-lg mt-2"
        >
          <TabsContent value="faces">
            <CircleGrid data={watchFaces} onClick={faceClickHandler} selectedItemValue={watchFace} />
          </TabsContent>
          <TabsContent value="straps">
            <CircleGrid data={watchStraps} onClick={strapClickHandler} selectedItemValue={watchStrap} />
          </TabsContent>
          <TabsContent value="colors">
            <ColorSection
              value={watchColor}
              onChange={(value) => colorChangeHandler(value)}
              resetHandler={() => dispatch(setWatchColor('none'))}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default WatchMenu;
