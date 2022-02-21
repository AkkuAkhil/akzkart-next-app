import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ChevronsLeft, ChevronsRight } from 'react-feather';
import PageContext from '../../contexts/PageContext';
import classes from './Pagination.module.css';

const Pagination = ({ admin }) => {
  const router = useRouter();
  const { page, productLastPage, adminLastPage, changePage } =
    useContext(PageContext);

  const lastPage = admin ? adminLastPage : productLastPage;

  const hasNextPage = page < lastPage;
  const hasPrevPage = page > 1;

  const goToPrevPage = () => {
    changePage(page - 1);
    router.push(`${admin ? '/admin' : ''}/products/page/${page - 1}`);
  };

  const goToNextPage = () => {
    if (!hasNextPage) return;
    changePage(page + 1);
    router.push(`${admin ? '/admin' : ''}/products/page/${page + 1}`);
  };

  const goToLastPage = () => {
    changePage(lastPage);
    router.push(`${admin ? '/admin' : ''}/products/page/${lastPage}`);
  };

  const goToFirstPage = () => {
    changePage(1);
    router.push(`${admin ? '/admin' : ''}/products/page/1`);
  };

  const displayFirstPage = page !== 1 && page - 1 !== 1;
  const displayLastPage = lastPage !== page && lastPage !== page + 1;

  return (
    <div className={classes.paginationContainer}>
      {hasPrevPage && (
        <button
          className={classes.paginationArrowButton}
          onClick={goToPrevPage}
        >
          <ChevronsLeft />
        </button>
      )}

      {displayFirstPage && (
        <button className={classes.paginationButton} onClick={goToFirstPage}>
          1
        </button>
      )}

      {hasPrevPage && (
        <button className={classes.paginationButton} onClick={goToPrevPage}>
          {page - 1}
        </button>
      )}

      <button className={`${classes.paginationButton} ${classes.active}`}>
        {page}
      </button>

      {hasNextPage && (
        <button className={classes.paginationButton} onClick={goToNextPage}>
          {page + 1}
        </button>
      )}

      {displayLastPage && (
        <button className={classes.paginationButton} onClick={goToLastPage}>
          {lastPage}
        </button>
      )}

      {hasNextPage && (
        <button
          className={classes.paginationArrowButton}
          onClick={goToNextPage}
        >
          <ChevronsRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
