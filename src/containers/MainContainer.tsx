import React, { FunctionComponent, useState } from 'react';
import FormContainer from '~containers/FormContainer';
import Header from '~components/Header';
import SlotsContainer from '~containers/SlotsContainer';
import Result from '~components/Result';

type LimitsObj = {
  min: string | number;
  max: string | number;
};

const MainContainer: FunctionComponent = () => {
  const [amount, setAmount] = useState<number>(1);
  const [limits, setLimits] = useState<LimitsObj | null>(null);
  const [results, setResults] = useState<Array<number> | null>(null);
  const valueToAmount = (value: string | number) => {
    let val = value.toString().length;
    val = val < 1 ? 1 : val;

    if (val !== amount) {
      setLimits(null);
      setAmount(val);
    }
  };

  const doGenerate = ({ min, max }: LimitsObj) => setLimits({ min, max });
  const doClear = () => {
    setLimits(null);
    setAmount(1);
  };

  return (
    <div className="container">
      <Header />
      <Result results={results} />
      <SlotsContainer
        amount={!limits ? 1 : amount}
        limits={limits}
        onSetResults={setResults}
      />
      <FormContainer
        onSetMaxValue={valueToAmount}
        onGenerate={doGenerate}
        onClear={doClear}
      />
    </div>
  );
};

export default MainContainer;
