import s from './Pagination.module.css'
import {useMemo} from "react";
import clsx from "clsx";

export const Pagination = ({total, pageSize, currentPage, onPageChange}) => {
    const pagesCount = Math.ceil(total / pageSize)

    const isStartPagination = currentPage < 5
    const isMiddlePagination = currentPage >= 5 && (currentPage <= pagesCount - 4)
    const isEndPagination = currentPage > pagesCount - 4
    const isVisiblePages = pagesCount > 5


    const pages = useMemo(() => {
        if (isStartPagination) {
            return Array.from({length: Math.min(pagesCount, 5)}, (_, i) => i + 1)
        } else if (isMiddlePagination) {
            return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
        } else if (isEndPagination) {
            return [pagesCount - 4, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount]
        } else {
            return []
        }
    }, [isStartPagination, isMiddlePagination, isEndPagination, currentPage, pagesCount])

    const onPrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const onNextClick = () => {
        if (currentPage < pagesCount) {
            onPageChange(currentPage + 1)
        }
    }

    const onPageClick = (page) => {
        if (page !== currentPage) {
            onPageChange(page)
        }
    }

    return <div className={s.pagination}>
        <button onClick={onPrevClick}>prev</button>
        <div>
            {(isMiddlePagination || isEndPagination) && isVisiblePages && <>
                <span onClick={() => onPageClick(1)} className={s.pageNumber}>1</span>
                <span>...</span>
            </>}
            {pages.map(page => <span key={page} onClick={() => onPageClick(page)}
                                     className={clsx(s.pageNumber, currentPage === page && s.selectedPage)}>{page}</span>)}
            {(isStartPagination || isMiddlePagination) && isVisiblePages && <>
                <span>...</span>
                <span onClick={() => onPageClick(pagesCount)} className={s.pageNumber}>{pagesCount}</span>
            </>}
        </div>
        <button onClick={onNextClick}>next</button>
    </div>
}
