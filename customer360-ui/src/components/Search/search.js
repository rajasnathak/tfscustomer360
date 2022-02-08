import React from 'react';
import Select from 'react-select';

const paramSearch = [
  { label: 'Shark', value: 'Shark' },
  { label: 'Dolphin', value: 'Dolphin' },
  { label: 'Whale', value: 'Whale' },
  { label: 'Octopus', value: 'Octopus' },
  { label: 'Crab', value: 'Crab' },
  { label: 'Lobster', value: 'Lobster' },
];

const searchList = () => {
    return (
    <Select
      options={aquaticCreatures}
      onChange={opt => console.log(opt.label, opt.value)}
    />
    )
        }

        export default withRouter(searchList);
        