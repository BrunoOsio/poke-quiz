export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    frontFace: string,
    backFace: string
  },
  isShowBackface: boolean
}