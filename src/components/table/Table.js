import { useState, useEffect, useRef } from 'react';
import './Table.css';

import Pagination from "../pagination/pagination";

function Table(props) {
  const { invoices, showDetails } = props;
  const [filterData, setFilterData] = useState(invoices.slice(0, 5));
  const [sortValue, setSortValue] = useState({});
  const [showPagination, setShowPagination] = useState(true);
  const isFirstRender = useRef(true);

  const changeHandler = (e) => {
    const searchTerm = e.target.value;
    switch (true) {
      case !!searchTerm:
        setFilterData(invoices.filter(d => d['Invoice ID'].includes(searchTerm)));
        break;
      case !searchTerm && showPagination:
        changePage(1);
        break;
      case !searchTerm && !showPagination:
        setFilterData(invoices);
        break;
      default:
        return;
    }
  }

  const sortHandler = (column) => {
    const type = (sortValue[column] === 'desc') ? 'asc' : 'desc';
    const currentData = [ ...filterData ];
    currentData.sort((a, b) => type === 'asc' ? ascendingOrder(a, b, column) : descendingOrder(a, b, column));
    setFilterData(currentData);
    // to set sorted property
    const sortedProperty = {};
    sortedProperty[column] = type;
    setSortValue(sortedProperty);
  }

  const ascendingOrder = (a, b, column) => {
    return (a[column] > b[column]) ? 1 : ((b[column] > a[column]) ? -1 : 0);
  }

  const descendingOrder = (a, b, column) => {
    return (b[column] > a[column]) ? 1 : ((a[column] > b[column]) ? -1 : 0);
  }

  const getArrow = (column) => {
    return (sortValue[column] === 'asc') ? <i className="fa fa-arrow-down" aria-hidden="true"></i> :
    (sortValue[column] === 'desc') ? <i className="fa fa-arrow-up" aria-hidden="true"></i> : null;
  }

  const changePage = (pageNo) => {
    setFilterData(invoices.slice((pageNo - 1 )*5, pageNo*5));
  }

  const toggleTableLayout = () => {
    setShowPagination(!showPagination);
  }

  const updateTableWithLayout = () => {
    (showPagination) ? changePage(1) : setFilterData(invoices);
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    updateTableWithLayout();
  }, [showPagination]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="table-container">
      <div className="table-sec">
        <div className="table-header">
          <div className="title">
            <span >Invoices</span>
          </div>
          <div className="table-filter">
            <span className="search">
              <input type="text" placeholder="Search" onChange={changeHandler} className="input-field"/>
              <i className="icon fa fa-search"></i>
            </span>
            <div className="button">
              <input type="checkbox" className="checkbox" onChange={toggleTableLayout}/>
              <div className="knobs">
                <span>Limit Offset</span>
              </div>
              <div className="layer"></div>
            </div>
          </div>
        </div>
        <table>
          <thead>
              <tr>
                <td onClick={() => sortHandler('Invoice ID')}>ID {getArrow('Invoice ID')}</td>
                <td onClick={() => sortHandler('Invoice Amount')}>Amount {getArrow('Invoice Amount')}</td>
                <td onClick={() => sortHandler('Billing Period')}>Time Period {getArrow('Billing Period')}</td>
                {/* couldn't add for these column as thier values are not proper*/}
                <td>Credits Used</td>
                <td>Status</td>
                <td></td>
              </tr>
          </thead>
          <tbody>
            {filterData.length && filterData.map(item => {
              return <tr key={item['Invoice ID']} onClick={() => showDetails(item)}>
                <td>{item['Invoice ID']}</td>
                <td>{item['Invoice Amount']}</td>
                <td>{item['Billing Period']}</td>
                <td><progress value={item['Credits Used']} max={item['Credits Limit']} />{item['Credits Used']}/{item['Credits Limit']}</td>
                {/* it's not printing due to csv convert issue */}
                <td>{item[`"Invoice Payment Status "`]}</td>
                <td><button><i className="fa fa-download mg-rgt"></i>Recipt</button></td>
              </tr>
            })}
          </tbody>
      </table>
      {
        invoices.length && showPagination && <div className="pagination-sec">
        <Pagination invoices={invoices} goToPageNumber={changePage} />
      </div>
      }
      </div>
    </div>
  );
}

export default Table;