import React from 'react';
import './Pagination.css';

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];
  
    while (i <= to) {
      range.push(i);
      i += step;
    }
  
    return range;
}

const Pagination = ({imagesPerPage, totalPages, paginate}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalPages/imagesPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <div>
            <ul className="pagination">
                {
                    pageNumbers.map(number => (
                        <li className="waves-effect" key={number}>
                            <a onClick={() => paginate(number)}>{number}</a>
                        </li>        
                    ))
                }
                {/* <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                <li className="active"><a href="#!">1</a></li>
                <li className="waves-effect"><a href="#!">2</a></li>
                <li className="waves-effect"><a href="#!">3</a></li>
                <li className="waves-effect"><a href="#!">4</a></li>
                <li className="waves-effect"><a href="#!">5</a></li>
                <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li> */}
            </ul>
        </div>
    )

}

export default Pagination;