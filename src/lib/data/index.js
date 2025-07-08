import { img1, img2, img3 } from "@/assets/hero/index";

export const colors = [
  { name: "Light Gray", color: "#CCCCCC" }, // Light gray
  { name: "Golden Yellow", color: "#EFBD4E" }, // Golden yellow
  { name: "Fresh Green", color: "#80C670" }, // Fresh green
  { name: "Deep Purple", color: "#726DE8" }, // Deep purple
  { name: "Vivid Red", color: "#EF674E" }, // Vivid red
  { name: "Charcoal Gray", color: "#353934" }, // Charcoal gray
];

export const shirtDesignTemplates = [
  {
    label: "Design 1",
    name: "design1",
    url: "/assets/models/collarless-shirt/textures/texture-1.jpg",
  },
  {
    label: "Design 2",
    name: "design2",
    url: "/assets/models/collarless-shirt/textures/texture-2.jpg",
  },
  {
    label: "Design 3",
    name: "design3",
    url: "/assets/models/collarless-shirt/textures/texture-3.jpg",
  },
  {
    label: "Design 4",
    name: "design4",
    url: "/assets/models/collarless-shirt/textures/texture-4.jpg",
  },
  {
    label: "Design 5",
    name: "design5",
    url: "/assets/models/collarless-shirt/textures/texture-5.jpg",
  },
];

export const watchFaces = [
  {
    label: "Round",
    value: "round",
    src: "/assets/models/watch/faces/round.png",
  },
  {
    label: "Rectangle",
    value: "rectangle",
    src: "/assets/models/watch/faces/rectangle.png",
  },
];
export const watchStraps = [
  {
    label: "Orange",
    value: "orange",
    src: "/assets/models/watch/straps/orange-strap.png",
  },
  {
    label: "Black",
    value: "black",
    src: "/assets/models/watch/straps/black-strap.jpg",
  },
];

export const coatingList = [
  { label: "Matte Aqueous Coating", value: "matt" },
  { label: "Gloss Lamination", value: "gloss" },
  { label: "Glossy Aqueous Coating", value: "gloss_aqueous" },
];
export const patternList = [
  {
    label: "Pattern 01",
    value: "pattern_01",
    url: "/assets/models/flat-box/patterns/pattern-01.jpg",
  },
  {
    label: "Pattern 02",
    value: "pattern_02",
    url: "/assets/models/flat-box/patterns/pattern-02.jpg",
  },
  {
    label: "Pattern 03",
    value: "pattern_03",
    url: "/assets/models/flat-box/patterns/pattern-03.jpg",
  },
  {
    label: "Pattern 04",
    value: "pattern_04",
    url: "/assets/models/flat-box/patterns/pattern-04.jpg",
  },
  {
    label: "Pattern 05",
    value: "pattern_05",
    url: "/assets/models/flat-box/patterns/pattern-05.jpg",
  },
];

export const productsData = [
  {
    imageUrl: "/assets/images/thumbnails/table.png",
    title: "Table",
    modelKey: "table",
  },
  {
    imageUrl: "/assets/images/thumbnails/box.png",
    title: "Flat Box",
    modelKey: "flat-box",
  },
  {
    imageUrl: "/assets/images/thumbnails/watch.png",
    title: "Watch",
    modelKey: "watch",
  },
  {
    imageUrl: "/assets/images/thumbnails/shirt.png",
    title: "Collarless Shirt",
    modelKey: "collarless-shirt",
  },
  {
    imageUrl: "/assets/images/thumbnails/sofa.png",
    title: "Sofa",
    modelKey: "sofa",
  },
];

export const tableSizes = [
  {
    label: "Medium",
    value: "medium",
    src: "/assets/models/table/sizes/medium.png",
  },
  {
    label: "Large",
    value: "large",
    src: "/assets/models/table/sizes/large.png",
  },
];
export const sofaTypes = [
  {
    label: "One",
    value: "sofa-one",
    src: "/assets/models/sofa/types/sofa_one.png",
  },
  {
    label: "Set",
    value: "sofa-set",
    src: "/assets/models/sofa/types/sofa_set.png",
  },
];

//hero section data
export const heroData = [
  {
    id: 1,
    colorDeep: "#304e70",
    colorLite: "#d3dce0",
    firstText: "Seamless",
    mainText: "3D Customization",
    subText:
      "Turn customization into an unforgettable experience with real-time 3D.",
    buttonText: "Customize Now",
    buttonLink: "/configurator",
    img: img1,
  },
  {
    id: 2,
    colorDeep: "#35553f",
    colorLite: "#dcdfc0",
    firstText: "Interactive",
    mainText: "3D Data Visualization",
    subText:
      "Experience data like never before—clear, interactive, and stunning.",
    buttonText: "Explore it",
    buttonLink: `/data-visualization`,
    img: img2,
  },
  {
    id: 3,
    colorDeep: "#431e1e",
    colorLite: "#e3d2c2",
    firstText: "Captivating",
    mainText: "Animation",
    subText: "Captivate your audience with motion that inspires action.",
    buttonText: "Explore it",
    buttonLink: "https://devfum-3d.framer.website/",
    img: img3,
  },
];

export const chartsData = [
  {
    imageUrl: "/assets/images/charts/bar-chart.png",
    title: "Bar Chart",
    chartName: "bar-chart",
  },
  {
    imageUrl: "/assets/images/charts/scatter-chart.png",
    title: "Scatter Chart",
    chartName: "scatter-chart",
  },
  {
    imageUrl: "/assets/images/charts/stacked-bar.png",
    title: "Stacked Bar",
    chartName: "stacked-bar",
  },
  {
    imageUrl: "/assets/images/charts/flight-globe.png",
    title: "Flight Globe",
    chartName: "flight-globe",
  },
];
export const animationData = [
  {
    imageUrl: "/assets/images/animation/landing-page.png",
    title: "Landing Page",
    link: "https://devfum-3d.framer.website/",
  },
  {
    imageUrl: "/assets/images/animation/scroll-animation.png",
    title: "Scroll Animation",
    link: "https://scroll-anim.framer.website/",
  },
];
