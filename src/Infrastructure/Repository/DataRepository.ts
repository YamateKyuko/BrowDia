import Infrastructure from "./../Infrastructure"

import { template, template_station } from "./UseCase/Presentation/Entity/Entity"

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  DefaultValue
} from 'recoil';

type Find = (index: number) => template_station
type Change = (key: keyof template, property: string) => void;
// template_station

function DataRepository() {

  

  // const find: Find = (index: number) => {


    
  //   const station: template_station =  Infrastructure().Data.railway.stations[index]
  //   return station
  // }

  const add = () => {
    
  }
  
  // const change: Change = (key, property) => {
  //   const a = Infrastructure().setData((prevState: template) => ({...prevState, key: property}))
  //   console.log(a)
  // }
  const del = () => {

  }

  // return {find, add, change, del};
}

export default DataRepository;