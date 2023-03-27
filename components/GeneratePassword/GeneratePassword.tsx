"use client"
import { copyToClipboard, generatePassword } from '@/utils';
import { Button, Checkbox, Form, InputNumber } from 'antd'
import React, { useEffect, useState } from 'react'


const GeneratePassword = () => {
    const [password, setPassword] = useState<string>('');
    const [passwordLength, setPasswordLength] = useState<number>(16);

    const [passwordUppercase, setPasswordUppercase] = useState<boolean>(true);
    const [passwordLowercase, setPasswordLowercase] = useState<boolean>(true);
    const [passwordNumbers, setPasswordNumbers] = useState<boolean>(true);
    const [passwordSpecial, setPasswordSpecial] = useState<boolean>(true);
    const [avoidAmbiguous, setAvoidAmbiguous] = useState<boolean>(true);

    const [minNums, setMinNums] = useState<number>(2);
    const [minSpecial, setMinSpecial] = useState<number>(2);




    useEffect(() => {
        setPassword(() =>
            generatePassword(
                passwordLength,
                minNums,
                minSpecial,
                passwordUppercase,
                passwordLowercase,
                passwordNumbers,
                passwordSpecial,
                avoidAmbiguous
            ))
    },
        [
            avoidAmbiguous, minNums, minSpecial, passwordLength, passwordLowercase, passwordNumbers, passwordSpecial, passwordUppercase
        ]
    )

    return (
        <div style={{ fontSize: '1.3rem' }}>
            <h3>Generator</h3>
            <hr />
            <p className='border p-4 text-center text-wrap text-break'>{password}</p>

            <div className="row my-4">
                <div className="col-md-4">
                    <label>Length</label> <br />
                    <InputNumber min={0} max={50} value={passwordLength} onChange={(value) => {
                        setPasswordLength(value as number)
                    }} />
                </div>
                <div className="col-md-4">
                    <label>Min numbers</label> <br />
                    <InputNumber value={minNums} min={0} max={passwordLength - minSpecial} onChange={(value) => {
                        setMinNums(value as number)
                    }} />
                </div>
                <div className="col-md-4">
                    <label>Min special</label> <br />
                    <InputNumber value={minSpecial} min={0} max={passwordLength - minNums} onChange={(value) => {
                        setMinSpecial(value as number)
                    }} />
                </div>
            </div>
            <div className='my-3'>
                <h5>Options</h5>

                <div className='d-flex flex-column p-3'>
                    <Checkbox checked={passwordUppercase} onChange={(e) => {
                        setPasswordUppercase(e.target.checked)
                    }}>Uppercase</Checkbox>

                    <Checkbox checked={passwordLowercase} onChange={(e) => {
                        setPasswordLowercase(e.target.checked)
                    }}>Lowercase</Checkbox>

                    <Checkbox checked={passwordNumbers} onChange={(e) => {
                        setPasswordNumbers(e.target.checked)
                    }}>Numbers</Checkbox>

                    <Checkbox checked={passwordSpecial} onChange={(e) => {
                        setPasswordSpecial(e.target.checked)
                    }}>Special</Checkbox>

                    <Checkbox checked={avoidAmbiguous} onChange={(e) => {
                        setAvoidAmbiguous(e.target.checked)
                    }}>Avoid Ambiguous</Checkbox>
                </div>
            </div>

            <div className="d-flex flex-wrap">
                <Button size='large' className='me-2 mb-1' type='primary' onClick={() => {
                    setPassword(() =>
                        generatePassword(
                            passwordLength,
                            minNums,
                            minSpecial,
                            passwordUppercase,
                            passwordLowercase,
                            passwordNumbers,
                            passwordSpecial,
                            avoidAmbiguous
                        ))
                }}>Regenerate password</Button>
                <Button size='large' onClick={() => {
                    copyToClipboard(password)
                }}>Copy password</Button>
            </div>









        </div>
    )
}

export default GeneratePassword