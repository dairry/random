import React from 'react';

function Result(props) {
  const listItems = props?.results?.map((number, index) => {
    let random = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5);
    if (index === props?.results?.length - 1) {
      return <span key={index + random}> {number}</span>;
    }
    return <span key={index + random}> {number} - </span>;
  });
  return (
    <div className="container container--flex">
      <div className="result">
        <h2 className="item-result">
          Results:
          {listItems}
        </h2>
      </div>
    </div>
  );
}

export default Result;
