import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useTranslation } from "react-i18next";
import { useFrame } from '@react-three/fiber'
import { Image } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import { easing } from 'maath'

const stateQbo = proxy({
  clicked: null,
  urls: ["qbo0", "qbo1", "qbo2", "qbo3", "qbo4", "qbo5", "qbo6"].map((u) => `/images/work/experience/${u}.jpg`)
});

const statePengo = proxy({
  clicked: null,
  urls: ["pengo0", "pengo1", "pengo2"].map((u) => `/images/work/experience/${u}.jpg`)
});

const stateFreelance = proxy({
  clicked: null,
  urls: ["freelance0", "freelance1", "freelance2", "freelance3"].map((u) => `/images/work/experience/${u}.jpg`)
});

const descByExperience = proxy({
  "FREELANCE": [{
    "FREELANCE0": {"name": "Fabrica de Cine", "desc": ""},
    "FREELANCE1": {"name": "Unimedik", "desc": ""},
    "FREELANCE2": {"name": "Gandhi", "desc": ""},
    "FREELANCE3": {"name": "Retop", "desc": ""}
  }],
  "QBO": [{
    "QBO0": {"name": "DlgMotoart", "desc": ""},
    "QBO1": {"name": "Gandhi", "desc": ""},
    "QBO2": {"name": "Ninewestmexico", "desc": ""},
    "QBO3": {"name": "El Palacio de Hierro", "desc": ""},
    "QBO4": {"name": "CAT Footwear", "desc": ""},
    "QBO5": {"name": "Colchas Concord", "desc": ""},
    "QBO6": {"name": "Ilusion", "desc": ""}
  }],
  "PENGO": [{
    "PENGO0": {"name": "Gandhi", "desc": ""},
    "PENGO1": {"name": "Tropic", "desc": ""},
    "PENGO2": {"name": "Coca Cola en tu hogar", "desc": ""},
  }]
});

const Experience = (props) => {
  const { t } = useTranslation();

  descByExperience.FREELANCE[0].FREELANCE0.desc = t('work.freelance.fabrica');
  descByExperience.FREELANCE[0].FREELANCE1.desc = t('work.freelance.unimedik');
  descByExperience.FREELANCE[0].FREELANCE2.desc = t('work.freelance.gandhi');
  descByExperience.FREELANCE[0].FREELANCE3.desc = t('work.freelance.retop');

  descByExperience.QBO[0].QBO0.desc = t('work.qbo.dlg');
  descByExperience.QBO[0].QBO1.desc = t('work.qbo.gandhi');
  descByExperience.QBO[0].QBO2.desc = t('work.qbo.nine');
  descByExperience.QBO[0].QBO3.desc = t('work.qbo.palacio');
  descByExperience.QBO[0].QBO4.desc = t('work.qbo.cat');
  descByExperience.QBO[0].QBO5.desc = t('work.qbo.concord');
  descByExperience.QBO[0].QBO6.desc = t('work.qbo.ilusion');

  descByExperience.PENGO[0].PENGO0.desc = t('work.pengo.gandhi');
  descByExperience.PENGO[0].PENGO1.desc = t('work.pengo.tropic');
  descByExperience.PENGO[0].PENGO2.desc = t('work.pengo.coca');

  return (
      <group position={props.position} scale={props.scale}>
          <Items name={props.name} />
      </group>
  )
}

function actionImageSelect (stateSelect, name, index, clicked) {

  if (descByExperience[name] !== undefined && descByExperience[name][0][index] !== undefined) {
    let nameExperience = descByExperience[name][0][index].name;
    let descExperience = descByExperience[name][0][index].desc;

    document.querySelector(".desc-selection").classList.add("active");
    document.querySelector(".desc-selection-input").value = name + " " + index;
    document.querySelector(".desc-selection .name-experience").innerHTML = nameExperience;
    document.querySelector(".desc-selection .desc-experience").innerHTML = descExperience;
  }

  if (stateSelect.clicked === name + index) {
    document.querySelector(".desc-selection").classList.remove("active");
    document.querySelector(".desc-selection-input").value = "";
  }

  return stateSelect.clicked = name + index === clicked ? null : name + index
}

function Item({name, index, position, scale, c = new THREE.Color(), ...props }) {
    var stateSelect = name === "QBO" ? stateQbo : statePengo;
    stateSelect = name === "FREELANCE" ? stateFreelance : stateSelect;

    const ref = useRef();
    const { clicked } = useSnapshot(stateSelect)
    const [hovered, hover] = useState(false)
    const click = () => actionImageSelect(stateSelect, name, index, clicked)
    const over = () => hover(true)
    const out = () => hover(false)

    useFrame((stateSelect, delta) => {
      easing.damp3(ref.current.scale, [clicked === name + index ? 7 : scale[0], clicked === name + index ? 5.5 : 5.5, 1], 0.15, delta)

      ref.current.material.scale[0] = ref.current.scale.x;
      ref.current.material.scale[1] = ref.current.scale.y;
      ref.current.material.scale["x"] = ref.current.scale.x;
      ref.current.material.scale["y"] = ref.current.scale.y;

      if (clicked !== null && name + index < clicked) easing.damp(ref.current.position, 'x', position[0] - 2.9, 0.15, delta)
      if (clicked !== null && name + index > clicked) easing.damp(ref.current.position, 'x', position[0] + 2.9, 0.15, delta)
      if (clicked === null || clicked === name + index) easing.damp(ref.current.position, 'x', position[0], 0.15, delta)

      easing.damp(ref.current.material, 'grayscale', hovered || clicked === name + index ? 0 : Math.max(0, 1), 0.15, delta)
      easing.dampC(ref.current.material.color, hovered || clicked === name + index ? 'white' : '#aaa', hovered ? 0.3 : 0.15, delta)
    })

    return <Image ref={ref} name={name} {...props} position={position} scale={scale} onClick={click} onPointerOver={over} onPointerOut={out} />
}

function Items({name, w = 1.3, gap = 0.15 }) {
    var stateSelect = name === "QBO" ? stateQbo : statePengo;
    stateSelect = name === "FREELANCE" ? stateFreelance : stateSelect;

    const { urls } = useSnapshot(stateSelect)
    const xW = w + gap

    return (
      <>
        {urls.map((url, i) => <Item key={i} name={name} index={name + i} position={[i * xW, 0, 0]} scale={[w, 5.5, 1]} url={url} />) /* prettier-ignore */}
      </>
    )
}

export default Experience;