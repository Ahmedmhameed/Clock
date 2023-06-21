/* eslint-disable react/prop-types */
export default function Control({ title, value, setValue, isRunning }) {
  return (
    <div className="length-control">
      <div id="break-label">{title}</div>
      <button
        className="btn-level"
        id="break-decrement"
        value="-"
        onClick={() =>
          setValue((pre) => (pre != 1 && !isRunning ? pre - 1 : pre))
        }
      >
        <i className="fa fa-arrow-down fa-2x"></i>
      </button>
      <div className="btn-level" id="break-length">
        {value}
      </div>
      <button
        className="btn-level"
        id="break-increment"
        value="+"
        onClick={() =>
          setValue((pre) => (pre != 60 && !isRunning ? pre + 1 : pre))
        }
      >
        <i className="fa fa-arrow-up fa-2x"></i>
      </button>
    </div>
  );
}
