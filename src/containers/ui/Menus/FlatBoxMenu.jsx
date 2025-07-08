'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import ItemList from '@/components/ui/Item-list';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  selectBoxColor,
  selectBoxDimensions,
  selectBoxLogos,
  selectBoxPattern,
  selectCurrentBoxLogo,
  setBoxCoating,
  setBoxColor,
  setBoxDimensions,
  setBoxLogos,
  setBoxPattern,
  setCurrentBoxLogo,
} from '@/lib/store/features/box/boxSlice';
import ImageUpload from '@/components/ui/image-uploader';
import { setOpenCustomizationDrawer } from '@/lib/store/features/general/generalSlice';
import IconButton from '@/components/ui/icon-button';
import { CircleHelp } from 'lucide-react';
import { coatingList, patternList } from '@/lib/data';
import ColorSection from '@/components/ui/color-section';
import CircleGrid from '@/components/ui/circle-grid';

const FlatBoxMenu = () => {
  const boxColor = useAppSelector(selectBoxColor);
  const boxPattern = useAppSelector(selectBoxPattern);
  const dispatch = useAppDispatch();

  const colorChangeHandler = (value) => {
    dispatch(setBoxColor(value));
    dispatch(setBoxPattern('none'));
  };

  const patternChangeHandler = (value) => {
    dispatch(setBoxColor(''));
    dispatch(setBoxPattern(value));
  };

  const coatingChangeHandler = (value) => {
    dispatch(setBoxCoating(value));
  };

  const boxDimensions = useAppSelector(selectBoxDimensions);
  const boxLogos = useAppSelector(selectBoxLogos);
  const currentBoxLogo = useAppSelector(selectCurrentBoxLogo);

  return (
    <div className="bg-transparent rounded-xl">
      <Tabs defaultValue="colors" style={{ minWidth: '350px' }}>
        <TabsList 
       className="p-6 bg-foreground/25"
       style={{
         borderRadius: "30px",
       }}
        >
          <TabsTrigger value="colors" className="px-3 py-3 rounded-full bg-transparent text-primary-foreground">Colors</TabsTrigger>
          <TabsTrigger value="pattern" className="px-3 py-3 rounded-full bg-transparent text-primary-foreground">Pattern</TabsTrigger>
          <TabsTrigger value="coating" className="px-3 py-3 rounded-full bg-transparent text-primary-foreground">Coating</TabsTrigger>
          <TabsTrigger value="dimensions"className="px-3 py-3 rounded-full bg-transparent text-primary-foreground">Dimensions</TabsTrigger>
          {/* <TabsTrigger value="branding" className="px-3 py-3 rounded-full bg-transparent text-primary-foreground">Branding</TabsTrigger> */}
        </TabsList>
        <div    style={{
            borderRadius: "30px",
          }}
          className="card-gradient p-4 shadow-lg mt-2">
          <TabsContent value="colors">
            <ColorSection
              value={boxColor}
              onChange={(value) => colorChangeHandler(value)}
              resetHandler={() => dispatch(setBoxColor(''))}
            />
          </TabsContent>
          <TabsContent value="dimensions">
            <div className="relative flex flex-col gap-8 p-3">
              <div className="flex justify-between items-center text-primary-foreground">
                <h2>Custom Size</h2>
                <HoverCard>
                  <HoverCardTrigger>
                    <IconButton>
                      <CircleHelp size="16px" />
                    </IconButton>
                  </HoverCardTrigger>
                  <HoverCardContent>{`Set 'h' to 0 for 2D files`}</HoverCardContent>
                </HoverCard>
              </div>
              <div className="w-full text-primary-foreground">
                <div className="mt-2">
                  <Label htmlFor="length">Length</Label>
                  <Input
                    id="length"
                    placeholder="Length"
                    value={boxDimensions.length}
                    onChange={(e) =>
                      dispatch(
                        setBoxDimensions({
                          ...boxDimensions,
                          length: parseInt(e.target.value, 10),
                        })
                      )
                    }
                  />
                </div>
                <div className="mt-2">
                  <Label htmlFor="breadth">Breadth</Label>
                  <Input
                    placeholder="Breadth"
                    value={boxDimensions.breadth}
                    onChange={(e) =>
                      dispatch(
                        setBoxDimensions({
                          ...boxDimensions,
                          breadth: parseInt(e.target.value, 10),
                        })
                      )
                    }
                  />
                </div>
                <div className="mt-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    placeholder="Height"
                    value={boxDimensions.height}
                    onChange={(e) =>
                      dispatch(
                        setBoxDimensions({
                          ...boxDimensions,
                          height: parseInt(e.target.value, 10),
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="coating">
            <div className="flex flex-col gap-2 p-3">
              <ItemList items={coatingList} onChange={coatingChangeHandler} />
            </div>
          </TabsContent>
          <TabsContent value="pattern">
            <CircleGrid
              data={patternList}
              onClick={(pattern) => patternChangeHandler(pattern?.value)}
              selectedItemValue={boxPattern}
            />
          </TabsContent>
          <TabsContent value="branding">
            <ImageUpload
              files={boxLogos}
              setFiles={(logos) => dispatch(setBoxLogos(logos))}
              selectedFile={currentBoxLogo}
              setSelectedFile={(logo) => {
                dispatch(setCurrentBoxLogo(logo));
                dispatch(setOpenCustomizationDrawer(true));
              }}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default FlatBoxMenu;
