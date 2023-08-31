import React from 'react';
import StationRepository from '../../Repository/StationRepository';
import DirectionRepository from '../../Repository/DirectionRepositry';
import { template, template_station } from '../../Entity/Entity'
// import Presentation from '../../../Presentation/SetStationPresentation'
import { selector, selectorFamily, DefaultValue } from 'recoil';
import Infrastructure from '../../Infrastructure/Infrastructure';



type BrunchOrderType = {
  isMain: boolean;
  border: boolean;
  Brunch: BrunchOrderType[];
}

const SetStaionUseCase = (() => {



})

export default SetStaionUseCase;