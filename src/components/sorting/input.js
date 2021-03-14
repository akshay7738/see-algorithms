import React, { useState } from 'react';
import { Select, Input, Button, message } from 'antd';
import './input.scss';

function Container(props) {
    const [values, setValues] = useState([]);
    const [status, setStatus] = useState(false);

    const handleSelect = (size) => {
        const values = [];
        for (let i = 0; i < size; i++) {
            values.push(Math.floor(Math.random() * 100));
        }
        setValues(values);
    };

    const handleInput = (e, i) => {
        values[i] = e.target.value;
        setValues([...values]);
    };

    const validate = () => {
        for (let i = 0; i < values.length; i++) {
            if (isNaN(parseInt(values[i]))) {
                message.error('Please enter valid number', 60);
                setStatus(false);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = () => {
        if (!status) {
            if (validate()) {
                setStatus(true);
                props.start(values);
            }
        } else {
            props.stop();
            setStatus(false);
            setValues([]);
        }
    };

    return (
        <div className="input">
            <span className="label">
                {!values.length ? 'Select number of elements: ' : 'Enter numbers: '}
                &nbsp;
            </span>
            {!values.length ? (
                <Select style={{ width: 60 }} onChange={handleSelect}>
                    {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => {
                        return (
                            <Select.Option key={i} value={i}>
                                {i}
                            </Select.Option>
                        );
                    })}
                </Select>
            ) : (
                <div>
                    {values.map((val, i) => {
                        return (
                            <Input
                                size="small"
                                key={i}
                                value={val}
                                onChange={(e) => handleInput(e, i)}
                                className="number"
                            />
                        );
                    })}
                </div>
            )}
            {values.length > 0 && (
                <div>
                    <Button type="primary" onClick={handleSubmit}>
                        {!status ? 'Start' : 'Stop'}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Container;
