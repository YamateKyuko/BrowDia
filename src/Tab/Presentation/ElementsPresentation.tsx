import React from 'react';
import './../css/Element.css';
import { template_listStyle, template_station, template_timetableFont, template_track, template_trainType, navArray, template_rgb, template_eventList, template } from '../../Entity/Entity';
import { isStation, RgbConverter, isTimetableFont, HexConverter , isRgb } from './SharedFunction';
import { SetterOrUpdater } from 'recoil';

type InputProps = {
  value: any;
  onChange: React.ChangeEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  className?: string;
  label?: string | React.ReactElement;
  dataLogo?: any;
  src?: string;
  disabled?: boolean;
  textArea?: boolean;
  time?: boolean;
  dataGray?: string;
  eventList?: template_eventList;
}

export function Input(props: InputProps) {


  return (
    <>
      {typeof props.value === "string" &&
        (!props.textArea
          ? (props.eventList
            ? <input type="text" {...props.eventList} className={props.className} value={props.value} disabled={props.disabled} data-gray={props.dataGray} />
            : <input type="text" className={props.className} value={props.value} onChange={props.onChange} disabled={props.disabled} />
          )
          : <textarea className={props.className} onChange={props.onChange} disabled={props.disabled}>{props.value}</textarea>
        )
      }
      {typeof props.value === "number" &&
        <input type="number" className={props.className} value={props.value} onChange={props.onChange} disabled={props.disabled} />
      }
      {isRgb(props.value) &&
        <input type="color" className={props.className} value={RgbConverter(props.value)} onChange={props.onChange} disabled={props.disabled} />
      }
      {typeof props.value === "boolean" && (!props.label
        ?
          <>
            <label className={"checkbox " + props.className}>
              <input type="checkbox" onChange={props.onChange} checked={props.value} />
            </label>
          </>
        : (!props.dataLogo
          ?
            <>
              <label className={props.className}>
                <input type="radio" onChange={props.onChange} checked={props.value} />
                {props.label}
              </label>
            </>
          :
            <>
              <label data-logo={props.dataLogo} className={props.className}>
                <input type="radio" onChange={props.onChange} checked={props.value} />
                {props.label}
              </label>
            </>
        )
      )}
    </>
  )
}

type StringInputProps = {
  value: string;
  set: (value: string) => void;
  textarea?: boolean;
  className?: string;
  disabled?: boolean;
}

export function StringInput(props: StringInputProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => props.set(event.target.value)

  const textareaOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => props.set(event.target.value)

  return (
    <>
      {!props.textarea
        ? <input type="text" className={props.className} onChange={onChange} value={props.value} disabled={props.disabled} />
        : <textarea className={props.className} onChange={textareaOnChange} disabled={props.disabled}>{props.value}</textarea>
      }
    </>
  )
}

type NumberInputProps = {
  value: number;
  set: (value: number) => void;
  className?: string;
  disabled?: boolean;
}

export function NumberInput(props: NumberInputProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => props.set(Number(event.target.value))
  return <input type="number" className={props.className} onChange={onChange} value={props.value} disabled={props.disabled} />
}

type BooleanInputProps = {
  value: boolean;
  set: (value: boolean) => void;
  className?: string;
  disabled?: boolean;
  label?: string | React.ReactElement;
  dataLogo?: any;
}

export function BooleanInput(props: BooleanInputProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => props.set(event.target.checked)

  return (
    <>
      {!props.label
        ?
          <label className={"checkbox " + props.className}>
            <input type="checkbox" onChange={onChange} checked={props.value} />
          </label>
        : (!props.dataLogo
          ?
            <>
              <label className={"radio " + props.className}>
                <input type="radio" onChange={onChange} checked={props.value} />
                {props.label}
              </label>
            </>
          :
            <>
              <label data-logo={props.dataLogo} className={"radio " + props.className}>
                <input type="radio" onChange={onChange} checked={props.value} />
                {props.label}
              </label>
            </>
        )
      }
    </>
  )
}

type ColorInputProps = {
  value: template_rgb;
  set: (value: template_rgb) => void;
  className?: string;
  disabled?: boolean;
}

export function ColorInput(props: ColorInputProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => props.set(HexConverter(event.target.value))
  return <input type="color" className={props.className} onChange={onChange} value={RgbConverter(props.value)} disabled={props.disabled} />
}

type ButtonProps = {
  value: string;
  set: () => void;
  className?: string;
  disabled?: boolean;
}

export function ButtonInput(props: ButtonProps) {
  const onClick = (): void => props.set()
  return <input type="button" value={props.value} onClick={onClick} className="" disabled={props.disabled} />
}

type FileInputProps = {
  set: (value: template) => void;
}

export function FileInput(props: FileInputProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event): void => {
    const files: FileList | null = event.target.files
    files && read(files)
  }

  const read = (file: FileList): void => {
    const reader = new FileReader()
    reader.readAsText(file[0])
    reader.onload = (event: ProgressEvent<FileReader>) => {
      console.log(event.target?.result)
      event.target?.result && JsonConv(event.target.result.toString())
    }
  }

  const JsonConv = (value: string): void => {
    const json = JSON.parse(value)

    props.set(json as template)
    

    // as での型変換のため、なんとかしなければならない。
  }

  return <input type="file" onChange={onChange} accept=".json" />
}

type IndexListboxProps = {
  values: template_station[] | template_track[] | template_trainType[] | template_timetableFont[] | template_listStyle[];
  selectedIndex: number;
  set: (index: number) => void;
}

export function IndexListbox(props: IndexListboxProps) {
  const className = (value: template_station | template_track | template_trainType | template_listStyle, index: number): string => {
    if (isStation(value)) {
      return `${!value.border && (index === props.values.length && "line")} ${value.brunchCoreStationIndex && "gray"}`
    }
    return "";
  }

  return (
    <fieldset>
      {props.values.map((value: template_station | template_track | template_trainType | template_timetableFont | template_listStyle, index: number) => (
        <>
          {isTimetableFont(value)
            ? <IndexListboxHandler selectedIndex={props.selectedIndex} set={props.set} index={index} label={value.family} key={index} />
            : <IndexListboxHandler selectedIndex={props.selectedIndex} set={props.set} index={index} label={value.name} className={className(value, index)} key={index} />
          }
        </>
      ))}
    </fieldset>
  )
}

type IndexListboxHandlerProps = {
  index: number;
  selectedIndex: number;
  set: (index: number) => void;
  label: string;
  className?: string;
}

function IndexListboxHandler(props: IndexListboxHandlerProps) {
  const set = (): void => props.set(props.index)

  return <BooleanInput value={props.selectedIndex === props.index} set={set} label={props.label} dataLogo={props.index + 1} className={props.className} />
}

type NavMoleculeProps = {
  navIndex: number;
  SetNavIndex: SetterOrUpdater<number>;
  value: navArray[];
}

export function NavMolecule(props: NavMoleculeProps) {
  const handler = (index: number) => props.SetNavIndex(index)

  return (
    <nav>
      <ul>
        {props.value.map((value: navArray, index: number) => (
          <NavAtom index={index} select={props.navIndex} value={value} handler={handler} key={index} />
        ))}
      </ul>
    </nav>
  )
}

type NavAtomProps = {
  index: number;
  select: number;
  value: navArray;
  handler: (index: number) => void;
}

function NavAtom(props: NavAtomProps) {
  const set = () => props.handler(props.index)

  return (
    <li>
      <BooleanInput value={props.index === props.select} set={set} label={props.value.label} />
    </li>
  )
}

type TrackProps = {
  tracks: template_track[];
  value: number;
  set: (index: number) => void;
}

export function Track(props: TrackProps) {
  return (
    <details>
      <summary data-logo={props.value + 1}>
        {props.tracks[props.value].name}
      </summary>
      <IndexListbox values={props.tracks} selectedIndex={props.value} set={props.set} />
    </details>
  )
}

type TrainTypeProps = {
  trainTypes: template_trainType[];
  value: number;
  set: (index: number) => void;
}

export function TrainType(props: TrainTypeProps) {
  return (
    <>
      <details>
        <summary data-logo={props.value + 1}>
          {props.trainTypes[props.value].name}
        </summary>
        <IndexListbox values={props.trainTypes} selectedIndex={props.value} set={props.set} />
      </details>
    </>
  )
}

// export default Input;