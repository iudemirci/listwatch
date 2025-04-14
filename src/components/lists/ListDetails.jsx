import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../axios/axiosInstance";
import { useMemo, useState } from "react";
import Title from "../../ui/Title";
import Poster from "../Poster";
import Skeleton from "../../ui/Skeleton";
import LinkToId from "../../ui/LinkToId";
import ReactPaginate from "react-paginate";
import AccountIcon from "../AccountIcon";
import Paragraph from "../../ui/Paragraph";
import ListBar from "./ListBar";
import HomePoster from "../homepage/HomePoster";

function ListDetails() {
  const { id } = useParams("id");
  const [options, setOptions] = useState({
    offset: 1,
    sort: "vote_average_desc",
  });

  async function fetchList() {
    let url = `4/list/${id}?language=en-US&sort_by=${options.sort}&page=${options.offset}`;

    const { data } = await api.get(url);

    return data;
  }
  async function fetchListNonStatic() {
    const url = `4/list/${id}?language=en-US&page=1`;
    const { data } = await api.get(url);
    return data;
  }

  const { data, isPending } = useQuery({
    queryKey: ["movieDB", id, "list", options.sort, options.offset],
    queryFn: fetchList,
    enabled: !!id,
  });
  const { data: nonStatic, isPending: isNonStaticPending } = useQuery({
    queryKey: ["movieDB", id, "list", "nonStatic"],
    queryFn: fetchListNonStatic,
    staleTime: Infinity,
    enabled: !!id,
  });
  const listName = nonStatic?.name;
  const totalPages = useMemo(() => nonStatic?.total_pages || 0, [nonStatic]);

  function handlePageClick(e) {
    setOptions({ ...options, offset: e.selected + 1 });
  }

  return (
    <div className="my-6 mt-[16rem] flex flex-col gap-4">
      <HomePoster path={nonStatic?.backdrop_path} short={true} />
      <div className="flex items-center gap-1">
        {isNonStaticPending ? (
          <Skeleton className="size-9 rounded-full" />
        ) : (
          <AccountIcon path={nonStatic?.created_by_?.avatar_path} />
        )}
        {isNonStaticPending ? (
          <Skeleton className="h-5 w-40" />
        ) : (
          <>
            <Title level={6} type="grey">
              List by
            </Title>
            <Title
              level={6}
              className="hover:text-primary cursor-pointer font-bold duration-300"
            >
              {nonStatic?.created_by?.username}
            </Title>
          </>
        )}
      </div>
      <ListBar
        setOptions={setOptions}
        options={options}
        item={nonStatic}
        isPending={isNonStaticPending}
      />
      {isNonStaticPending ? (
        <Skeleton className="h-6" />
      ) : (
        <Title level={2}>{listName}</Title>
      )}
      <ul className="grid grid-cols-4 gap-2 pt-4 text-center lg:grid-cols-5 lg:gap-3 2xl:gap-4">
        {isPending || isNonStaticPending
          ? [...Array(20)].map((_, i) => (
              <li key={i} className="flex flex-col gap-1">
                <div className="aspect-2/3">
                  <Skeleton />
                </div>
                <Paragraph type="primary">
                  {i + 1 + (options.offset - 1) * 20}
                </Paragraph>
              </li>
            ))
          : data?.results?.map((item, i) => (
              <li key={item?.id} className="flex flex-col gap-1">
                <LinkToId
                  item={item}
                  type={
                    item?.release_date || item?.release_date === ""
                      ? "movie"
                      : "tv"
                  }
                >
                  <Poster path={item?.poster_path} />
                </LinkToId>
                <Paragraph type="primary">
                  {i + 1 + (options.offset - 1) * 20}
                </Paragraph>
              </li>
            ))}
      </ul>
      <div className="flex items-center justify-center">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={totalPages}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          containerClassName="flex list-none  bg-grey-secondary rounded-md overflow-hidden"
          pageLinkClassName="cursor-pointer size-8 flex items-center justify-center text-center inline-block mt-1 focus:outline-none"
          previousLinkClassName="size-8 flex items-center justify-center text-center cursor-pointer"
          nextLinkClassName="size-8 flex items-center justify-center text-center cursor-pointer"
          breakClassName="cursor-pointer size-8 flex items-center justify-center text-center inline-block "
          activeClassName="activeClass"
        />
      </div>
    </div>
  );
}

export default ListDetails;
