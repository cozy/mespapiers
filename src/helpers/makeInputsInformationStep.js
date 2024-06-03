import { ContactAdapter } from 'src/components/ModelSteps/widgets/ContactAdapter/ContactAdapter'
import { CountryListAdapter } from 'src/components/ModelSteps/widgets/CountryListAdapter'
import InputDateAdapter from 'src/components/ModelSteps/widgets/InputDateAdapter'
import InputTextAdapter from 'src/components/ModelSteps/widgets/InputTextAdapter'
import RadioAdapter from 'src/components/ModelSteps/widgets/RadioAdapter'

const hasInputDate = ({ attrs }) => {
  return attrs.type === 'date'
}
const hasInputText = ({ attrs }) => {
  return attrs.type === 'text' || attrs.type === 'number'
}
const hasRadio = ({ attrs }) => {
  return attrs.type === 'radio'
}
const hasContact = ({ attrs }) => {
  return attrs.type === 'contact'
}
const hasCountry = ({ attrs }) => {
  return attrs.type === 'country'
}

const inputInformationSpecs = {
  date: {
    condition: hasInputDate,
    component: InputDateAdapter
  },
  text: {
    condition: hasInputText,
    component: InputTextAdapter
  },
  radio: {
    condition: hasRadio,
    component: RadioAdapter
  },
  contact: {
    condition: hasContact,
    component: ContactAdapter
  },
  country: {
    condition: hasCountry,
    component: CountryListAdapter
  }
}

/**
 * Get only the correct Inputs based on the attributes passed
 *
 * @param {Object[]} attributes - Array of PapersDefinitions attributes
 * @returns {{ Component: Object, attrs: Object }[]}
 */
export const makeInputsInformationStep = (attributes = []) => {
  const inputs = []

  for (const attrs of attributes) {
    Object.values(inputInformationSpecs).forEach(stepRule => {
      if (stepRule.condition({ attrs })) {
        inputs.push({ Component: stepRule.component, attrs })
      }
    })
  }

  return inputs
}
