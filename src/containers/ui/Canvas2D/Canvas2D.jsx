import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import {
  selectCanvas2dDimensions,
  selectOpenCustomizationDrawer,
  selectSelectedLogo,
  selectSelectedModel,
  setCanvas2dDimensions,
  setOpenCustomizationDrawer,
} from '@/lib/store/features/general/generalSlice';
import { BOX_FACES, DIMENSIONS } from '@/constants';
import {
  selectBoxColor,
  selectBoxPattern,
  selectCurrentBoxFace,
  selectCustomFacesForBox,
  setCurrentBoxFace,
  setCustomFacesForBox,
} from '@/lib/store/features/box/boxSlice';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Drawer, {
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Canvas, FabricImage, FabricObject } from 'fabric';
import { SRGBColorSpace } from 'three';
import { TextureLoader } from 'three';

const Canvas2D = () => {
  const selectedModel = useAppSelector(selectSelectedModel);
  const currentBoxFace = useAppSelector(selectCurrentBoxFace);
  const dispatch = useAppDispatch();
  const canvasRef = useRef(null);
  const canvas = useRef(null);
  const customFaces = useAppSelector(selectCustomFacesForBox);
  const canvasDimensions = useAppSelector(selectCanvas2dDimensions);
  const boxPattern = useAppSelector(selectBoxPattern);
  const boxColor = useAppSelector(selectBoxColor);
  const [loadingImage, setLoadingImage] = useState(false);
  const openCustomizationDrawer = useAppSelector(selectOpenCustomizationDrawer);
  const selectedLogo = useAppSelector(selectSelectedLogo);
  const [isCanvasUpdated, setIsCanvasUpdated] = useState(false);

  const loadCanvasState = (state) => {
    console.log('State', state);
    if (isCanvasUpdated) {
      console.log('CanvasUpdated');
    }

    if (loadingImage) {
      console.log('LoadingImage');
    }

    canvas.current.loadFromJSON(state, () => {
      canvas.current.renderAll.bind(canvas.current)();

      if (boxPattern !== 'none') {
        setLoadingImage(true);
        FabricImage.fromURL(
          `/assets/models/flat-box/patterns/${boxPattern}/${currentBoxFace}.jpg`,
          { crossOrigin: 'anonymous' }
        )
          .then((img) => {
            setLoadingImage(false);
            img.scaleToWidth(canvas.current.width);
            img.scaleToHeight(canvas.current.height);

            canvas.current.backgroundImage = img;
            canvas.current.renderAll();
          })
          .catch((error) => {
            setLoadingImage(false);
            console.error('Failed to load image:', error);
          });
      } else if (boxColor) {
        canvas.current.backgroundColor = boxColor;
        canvas.current.renderAll();
      }
    });
  };

  const updateCanvas = () => {
    setIsCanvasUpdated(true);

    const dataURL = canvas.current.toDataURL({
      format: 'png',
      multiplier: 1,
      quality: 1,
    });
    const texture = new TextureLoader().load(dataURL);
    texture.colorSpace = SRGBColorSpace;

    const canvasText = canvas.current.toJSON();

    dispatch(
      setCustomFacesForBox({
        boxFace: currentBoxFace,
        value: texture,
        canvasTexture: canvasText,
        dimensions: {
          width: canvasDimensions.width,
          height: canvasDimensions.height,
        },
      })
    );
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvas.current = new Canvas(canvasRef.current, {
        width: canvasDimensions.width || 600,
        height: canvasDimensions.height || 400,
      });

      FabricObject.prototype.transparentCorners = true;
      FabricObject.prototype.cornerStyle = 'circle';
      FabricObject.prototype.cornerColor = '#1f313a';
      FabricObject.prototype.cornerSize = 12;
      FabricObject.prototype.borderColor = '#1f313a';
    }

    if (
      customFaces &&
      customFaces[currentBoxFace] &&
      customFaces[currentBoxFace].canvasTexture
    ) {
      loadCanvasState(customFaces[currentBoxFace].canvasTexture);
    } else {
      if (boxPattern !== 'none') {
        setLoadingImage(true);
        FabricImage.fromURL(
          `/assets/models/flat-box/patterns/${boxPattern}/${currentBoxFace}.jpg`,
          { crossOrigin: 'anonymous' }
        )
          .then((img) => {
            setLoadingImage(false);
            img.scaleToWidth(canvas.current.width);
            img.scaleToHeight(canvas.current.height);

            canvas.current.backgroundImage = img;
            canvas.current.renderAll();
          })
          .catch((error) => {
            setLoadingImage(false);
            console.error('Failed to load image:', error);
          });
      } else if (boxColor) {
        canvas.current.backgroundColor = boxColor;
        canvas.current.renderAll();
      }
    }

    canvas.current.on('object:modified', updateCanvas);
    canvas.current.on('object:added', updateCanvas);
    canvas.current.on('object:removed', updateCanvas);

    return () => {
      canvas.current?.dispose();
      canvas.current = null;
    };
  }, [canvasDimensions.width, canvasDimensions.height, boxPattern, boxColor, currentBoxFace]);

  const faceSelectHandler = (face) => {
    dispatch(setCurrentBoxFace(face?.faceKey));

    const [surface, side] = face?.faceKey?.split('_');

    if (
      ['inside', 'outside'].includes(surface) &&
      ['top', 'bottom', 'right', 'left', 'front', 'back'].includes(side)
    ) {
      const faceDimension = DIMENSIONS['flat-box'][surface][side];
      dispatch(setCanvas2dDimensions(faceDimension));
    } else {
      console.error(`Invalid surface or side: ${surface}, ${side}`);
    }
  };

  useEffect(() => {
    if (
      customFaces &&
      customFaces[currentBoxFace] &&
      customFaces[currentBoxFace].canvasTexture
    ) {
      loadCanvasState(customFaces[currentBoxFace].canvasTexture);
    }
  }, [currentBoxFace]);

  useEffect(() => {
    if (selectedLogo && selectedLogo.id) {
      FabricImage.fromURL(selectedLogo.url, { crossOrigin: 'anonymous' }).then((img) => {
        img.set({
          left: canvas.current.width / 4,
          top: canvas.current.height / 2,
        });

        canvas.current.add(img);
        canvas.current.setActiveObject(img);
        img.setCoords();
        canvas.current.renderAll();
      });
    }
  }, [selectedLogo]);

  const handleDelete = () => {
    const activeObjects = canvas?.current?.getActiveObjects();
    if (activeObjects && activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        canvas.current?.remove(obj);
      });
      canvas.current?.discardActiveObject();
      canvas.current?.renderAll();
    }
  };

  return (
    <div>
      <Drawer
        isOpen={openCustomizationDrawer}
        onClose={() => dispatch(setOpenCustomizationDrawer(false))}
      >
        <DrawerHeader>
          <DrawerTitle>Custom Logo Placement {`(${currentBoxFace})`}</DrawerTitle>
          <span>Select sides of the box from below.</span>
        </DrawerHeader>

        <DrawerDescription>
          <Accordion type="multiple">
            <AccordionItem value="outside">
              <AccordionTrigger>Outside</AccordionTrigger>
              <AccordionContent>
                <TooltipProvider>
                  {BOX_FACES[selectedModel]?.outsideFaces?.map((face) => {
                    const FaceIcon = face.icon;
                    return (
                      <div
                        key={face.faceKey}
                        style={{
                          display: 'inline-flex',
                          marginRight: '15px',
                          backgroundColor: '#e9e9e9',
                          padding: '5px 10px',
                          borderRadius: '10px',
                          border: currentBoxFace === face.faceKey ? '2px solid #0d1b2e' : '',
                        }}
                        onClick={() => faceSelectHandler(face)}
                      >
                        <Tooltip>
                          <TooltipTrigger>
                            <div style={{ width: '32px' }}>
                              <FaceIcon />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{face?.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    );
                  })}
                </TooltipProvider>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="inside">
              <AccordionTrigger>Inside</AccordionTrigger>
              <AccordionContent>
                <TooltipProvider>
                  {BOX_FACES[selectedModel]?.insideFaces?.map((face) => {
                    const FaceIcon = face.icon;
                    return (
                      <div
                        key={face.faceKey}
                        style={{
                          display: 'inline-flex',
                          marginRight: '15px',
                          backgroundColor: '#e9e9e9',
                          padding: '5px 10px',
                          borderRadius: '10px',
                          border: currentBoxFace === face.faceKey ? '2px solid #0d1b2e' : '',
                        }}
                        onClick={() => faceSelectHandler(face)}
                      >
                        <Tooltip>
                          <TooltipTrigger>
                            <div style={{ width: '32px' }}>
                              <FaceIcon />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{face?.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    );
                  })}
                </TooltipProvider>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div style={{ width: `${canvasDimensions.width}px` }}>
            <canvas ref={canvasRef} />
          </div>
        </DrawerDescription>

        <DrawerFooter>
          <Button onClick={() => dispatch(setOpenCustomizationDrawer(false))} variant="secondary">
            Close
          </Button>
          <Button onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </DrawerFooter>
      </Drawer>
    </div>
  );
};

export default Canvas2D;
