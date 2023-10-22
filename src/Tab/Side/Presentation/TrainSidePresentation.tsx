import React from 'react';
import './../../css/Element.css';
import './../../css/Set.css';
import { template_trainType, template_train } from '../../../Entity/Entity';
import {
  useRecoilState,
  useRecoilValue,
  SetterOrUpdater
} from 'recoil';

import TrainRepository from '../../../Repository/TrainRepository';
import TrainTypeRepository from '../../../Repository/TrainTypeRepository';
import { TrainType } from '../../Presentation/ElementsPresentation';

type ComponentProps = {
  train: template_train;
  trainTypes: template_trainType[];
  SetTrain: SetterOrUpdater<template_train>;
}

function Component(props: ComponentProps) {

  return (
    <ul>
      <li>
        種別
        <Type trainTypes={props.trainTypes} value={props.train.type} SetTrain={props.SetTrain} />
      </li>
      <li>
        番号
      </li>
      <li>
        名称
      </li>
      <li>
        号
      </li>
      <li>
        情報
      </li>
    </ul>
  );
}

type TypeProps = {
  trainTypes: template_trainType[];
  value: number;
  SetTrain: SetterOrUpdater<template_train>;
}

function Type(props: TypeProps) {
  const set = (index: number): void => {
    props.SetTrain((prevState: template_train) => ({...prevState, type: index}))
  }

  return (
    <TrainType trainTypes={props.trainTypes} value={props.value} set={set} />
  )
}

function Side() {
  const [train, SetTrain] = useRecoilState<template_train>(TrainRepository().train);

  const trainTypes: template_trainType[] = useRecoilValue(TrainTypeRepository().trainTypes);
  
  

  return (
    <Component
      train={train}
      trainTypes={trainTypes}
      SetTrain={SetTrain}
    />
  )
}

export default Side;