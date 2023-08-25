import React from 'react';
import StationRepository from '../StationRepository';
import DirectionRepository from '../DirectionRepositry';
import { template, template_station } from './Presentation/Entity/Entity'
import Presentation from './Presentation/SetStationPresentation'
import { selector, selectorFamily, DefaultValue } from 'recoil';
import Infrastructure from '../../Infrastructure';



type BrunchOrderType = {
  isMain: boolean;
  border: boolean;
  Brunch: BrunchOrderType[];
}

const SetStaionUseCase = (() => {



})

export default SetStaionUseCase;