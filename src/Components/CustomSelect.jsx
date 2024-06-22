import React from 'react';
import Select from 'react-select';
import { useTheme } from '../Provider/ThemeProvider';

const CustomSelect = ({ options, value, onChange }) => {
    const { theme } = useTheme();

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: `1px solid ${theme ? '#1C7261' : ''}`,
            borderRadius: '4px',
            padding: '2px',
            minHeight: '30px',
            fontSize: '14px',
            backgroundColor: 'transparent',
            color: theme ? '#FFFFDF' : '#000',
            '&:hover': {
                border: `1px solid #1C7261`,
                boxShadow: state.isFocused ? `0 0 0 1px #1C7261` : "",
            },
            boxShadow: "",
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0 6px',
            color: theme ? '#FFFFDF' : '#000',
        }),
        input: (provided) => ({
            ...provided,
            margin: '0',
            padding: '0',
            backgroundColor: 'transparent',
            color: theme ? '#FFFFDF' : '#000',
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '14px',
            color: theme ? '#CBCCD5' : '#000',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#1B7261' : state.isFocused ? '#CABCB2' : theme ? '#333' : '#FFF',
            color: state.isSelected ? "white" : state.isFocused ? 'black' : theme ? '#FFF' : '#000',
            fontSize: '14px',
            ':active': {
                backgroundColor: '#1B7261',
                color: '#FFF',
            },
        }),
        menu: (provided) => ({
            ...provided,
            fontSize: '14px',
            backgroundColor: theme ? '#333' : '#FFF',
            color: theme ? '#FFF' : '#000',
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: '14px',
            color: theme ? '#BEBEBE' : '#000',
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            height: '30px',
            color: theme ? 'white' : '#000',
        }),
    };

    return (
        <Select
            styles={customStyles}
            options={options}
            value={options.find(option => option.value === value)}
            onChange={onChange}
            components={{ IndicatorSeparator: () => null }}
        />
    );
};

export default CustomSelect;
