import * as React from "react";
import { useSearchParams } from "react-router-dom";
import FilterIcon from "./icons/filter.icon";
import SortingIcon from "./icons/sorting.icon";

export interface IFilterSectionProps {
  add_button?: React.ReactNode;
  not_search?: boolean;
  sorting?: boolean;
  filter?: boolean;
  sorting_field?: string;
}

export default function SearchSection(props: IFilterSectionProps) {
  const [params, setParams] = useSearchParams();

  const [sorting, setSorting] = React.useState({
    sort_by: "name",
    sort_direction: "DESC",
  });

  React.useEffect(() => {
    setSorting({ ...sorting, sort_by: props.sorting_field || "name" });
  }, [props.sorting_field]);

  return (
    <div className="filter_sec">
      <div className="row">
        <div className="col-md-7">
          {!props.not_search && (
            <div className="form-group">
              <div className="input_box">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  onChange={(e) => {
                    setParams({ ...params, search: e.target.value.trim() });
                  }}
                />
                <span>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="col-md-5">
          {props.add_button && (
            <div className="upload_add_box">{props.add_button}</div>
          )}
          {(props.sorting || props.filter) && (
            <div className="filter_btn_box">
              {props.filter && (
                <a>
                  <FilterIcon />
                </a>
              )}

              {props.sorting && (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  style={{
                    transform: `rotateZ(${
                      sorting.sort_direction === "ASC" ? 0 : 180
                    }deg)`,
                  }}
                  title="Sort By Name"
                  onClick={() => {
                    let { sort_direction } = sorting;

                    if (sort_direction === "DESC") {
                      sort_direction = "ASC";
                    } else {
                      sort_direction = "DESC";
                    }
                    setParams({
                      ...params,
                      ...sorting,
                    });
                    setSorting({ ...sorting, sort_direction });
                  }}
                >
                  <SortingIcon />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
