import { useEffect, useState } from 'react';
import './pagination.css';

function Pagination({invoices, goToPageNumber}) {
    const [pageNo, setPageNo] = useState(1);
    const [defaultPages, setDefaultPages] = useState([]);
    const [pageInput, setPageInput] = useState();

    const selectPageNum = (num) => {
        setPageNo(num);
        goToPageNumber(num);
    }

    useEffect(() => {
        const numberOfPages = Math.ceil(invoices.length / 5);
        setDefaultPages(Array(numberOfPages).fill().map((_, i) => i+1));
    }, [invoices.length]);

    const updateInputPage = (num) => {
        const max = defaultPages[defaultPages.length - 1];
        if (num <= max) {
            setPageInput(num);
        } else {
            setPageInput(max);
        }
    }

    return (
        <div className="pagination">
            <div className="page-list">
                {defaultPages.length && defaultPages.map(p => <button key={p} className={ p === pageNo ? "btn active" : "btn"} onClick={() => selectPageNum(p)}>{p}</button>)}
            </div>
            <div>
                <label className="mg-rgt">Go to page</label>
                <input className="mg-rgt" type="number" min="1" max={defaultPages[defaultPages.length - 1]} onChange={(e) => updateInputPage(parseInt(e.target.value))} />
                <button className="primary-btn active" onClick={() => selectPageNum(pageInput)}>Go <i className="fa fa-arrow-right"></i></button>
            </div>
        </div>
    )
}

export default Pagination;