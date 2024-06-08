import { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { mockedInfo } from '../mocks/mockedInfo';
import { useScreenWidth } from '../hooks/useScreenWidth';
import {
  FaMapMarkerAlt,
  FaMapMarkedAlt,
  FaBook,
  FaRegClock,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import { cn } from '../utils/cn';

type RowData = {
  horario: string;
  materia: string;
  professor: string;
  imagem: string;
  localizacao: string;
};

export function Table() {
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 700;
  const data = useMemo(() => mockedInfo.dias.segunda, []);

  const columns: Column<RowData>[] = useMemo(
    () => [
      {
        Header: () =>
          isMobile ? (
            <div className="flex justify-center items-center">
              <FaRegClock />
            </div>
          ) : (
            'Horário'
          ),
        accessor: 'horario',
        Cell: ({ value }) => (
          <div className="text-[13px] md:text-base">{value}</div>
        ),
      },
      {
        Header: () =>
          isMobile ? (
            <div className="flex justify-center items-center">
              <FaBook />
            </div>
          ) : (
            'Matéria'
          ),
        accessor: 'materia',
        Cell: ({ value }) => (
          <div className="text-[13px] md:text-base">{value}</div>
        ),
      },
      {
        Header: () =>
          isMobile ? (
            <div className="flex justify-center items-center">
              <FaChalkboardTeacher />
            </div>
          ) : (
            'Professor'
          ),
        accessor: 'professor',
        Cell: ({ value }) => (
          <div className="text-[13px] md:text-base">{value}</div>
        ),
      },
      {
        Header: () =>
          isMobile ? (
            <div className="flex justify-center items-center">
              <FaMapMarkerAlt />
            </div>
          ) : (
            'Localização'
          ),
        accessor: 'localizacao',
        Cell: () =>
          isMobile ? (
            <div className="cursor-pointer flex items-center justify-center">
              <FaMapMarkedAlt className="w-[20px] h-[20px]" />
            </div>
          ) : (
            <div className="bg-red-primary p-[3px] cursor-pointer rounded-md text-white w-full text-[13px] md:text-base">
              Localização
            </div>
          ),
      },
    ],
    [isMobile],
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="p-4 max-w-[800px] w-full">
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200 table-fixed"
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="bg-red-primary"
            >
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps()}
                  className={cn(
                    'px-6 w-fit py-3 text-center text-md font-bold text-white uppercase tracking-wider',
                    index === 0 ? 'rounded-tl-lg' : '',
                    index === headerGroup.headers.length - 1
                      ? 'rounded-tr-lg'
                      : '',
                  )}
                >
                  <div
                    className={`${index === 0 ? 'rounded-tl-lg' : ''} ${
                      index === headerGroup.headers.length - 1
                        ? 'rounded-tr-lg'
                        : ''
                    }`}
                  >
                    {column.render('Header')}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <td
                    {...cell.getCellProps()}
                    className={`px-2 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ${
                      index === 0 ? 'rounded-bl-lg' : ''
                    } ${
                      index === row.cells.length - 1 ? 'rounded-br-lg' : ''
                    } `}
                  >
                    <div
                      className={`${index === 0 ? 'rounded-bl-lg' : ''} ${
                        index === row.cells.length - 1 ? 'rounded-br-lg' : ''
                      }`}
                    >
                      {cell.render('Cell')}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
