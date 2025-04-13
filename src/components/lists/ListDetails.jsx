import { useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "../../axios/axiosInstance";
import { useEffect, useMemo, useRef, useState } from "react";
import Title from "../../ui/Title";
import Poster from "../Poster";
import Skeleton from "../../ui/Skeleton";
import LinkToId from "../../ui/LinkToId";
import ReactPaginate from "react-paginate";
import AccountIcon from "../AccountIcon";
import Paragraph from "../../ui/Paragraph";

function ListDetails() {
  const { id } = useParams("id");
  const [offset, setOffset] = useState(1);

  async function fetchList() {
    const url = `4/list/${id}?language=en-US&page=${offset}`;

    const { data } = await api.get(url);
    return data;
  }

  const { data, isPending } = useQuery({
    queryKey: ["movieDB", id, "list", offset],
    queryFn: fetchList,

    enabled: !!id,
  });
  console.log(data);
  const listName = data?.name;
  const totalPages = useMemo(() => data?.total_pages || 0, [data]); // Memoize totalPages

  function handlePageClick(e) {
    console.log(e.selected);
    setOffset(e.selected + 1);
  }

  return (
    <div className="my-6 flex flex-col gap-6">
      <Title level={2}>{listName}</Title>
      <AccountIcon path={data?.create_by_?.avatar_path} />
      <Paragraph type="tertiary">{data?.created_by?.username}</Paragraph>
      <ul className="grid grid-cols-4 gap-2 text-center">
        {isPending
          ? [...Array(20)].map((_, i) => (
              <li key={i} className="flex flex-col gap-1">
                <div className="aspect-2/3">
                  <Skeleton />
                </div>
                <Paragraph type="primary">
                  {i + 1 + (offset - 1) * 20}
                </Paragraph>
              </li>
            ))
          : data?.results?.map((item, i) => (
              <li key={item?.id} className="flex flex-col gap-1">
                <LinkToId item={item} type="movie">
                  <Poster path={item?.poster_path} />
                </LinkToId>
                <Paragraph type="primary">
                  {i + 1 + (offset - 1) * 20}
                </Paragraph>
              </li>
            ))}
      </ul>
      <div className="flex items-center justify-center">
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          pageCount={totalPages}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          containerClassName="flex list-none  bg-grey-secondary rounded-md overflow-hidden"
          pageLinkClassName="cursor-pointer size-7 flex items-center justify-center text-center inline-block"
          previousClassName="previous-item"
          nextClassName="next-item"
          breakClassName="cursor-pointer size-7 flex items-center justify-center text-center inline-block"
          activeClassName="activeClass"
        />
      </div>
    </div>
  );
}

export default ListDetails;
