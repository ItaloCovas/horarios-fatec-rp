import { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import {
  FaMapMarkerAlt,
  FaMapMarkedAlt,
  FaBook,
  FaRegClock,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import { cn } from '../../utils/cn';
import { Class } from '../../services/usersService/signInUser';

interface TableProps {
  openDialog: () => void;
  data: Class[];
  setLocationTitle: React.Dispatch<React.SetStateAction<string>>;
  setImageURL: React.Dispatch<React.SetStateAction<string>>;
}

type RowData = {
  horario: string;
  materia: string;
  professor: string;
  imagemUrl: string;
  sala: string;
  andar: string;
};

export function Table({
  openDialog,
  data,
  setLocationTitle,
  setImageURL,
}: TableProps) {
  const screenWidth = useScreenWidth();
  const isMobile = useMemo(() => screenWidth < 700, [screenWidth]);
  const isBreakingHour = useMemo(() => screenWidth < 452, [screenWidth]);

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
          <div className="text-[13px] md:text-base font-semibold">{value}</div>
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
          <div className="text-[13px] md:text-base font-semibold">{value}</div>
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
          <div className="text-[13px] md:text-base font-semibold text-center">
            {value}
          </div>
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
        accessor: 'andar',
        Cell: ({ row }) => {
          const { andar, imagemUrl, sala } = row.original;
          return (
            <div
              className="cursor-pointer flex items-center justify-center"
              onClick={() => {
                setLocationTitle(`${sala} - ${andar}`);
                setImageURL(imagemUrl);
                openDialog();
              }}
            >
              <FaMapMarkedAlt className="w-[20px] h-[20px]" />
            </div>
          );
        },
      },
    ],
    [isMobile, openDialog, setLocationTitle, setImageURL],
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
                    'px-6 py-3 text-center text-md font-bold text-white uppercase tracking-wider border-r border-red-900',
                    index === 0 ? 'rounded-tl-lg' : '',
                    index === headerGroup.headers.length - 1
                      ? 'rounded-tr-lg border-none'
                      : '',
                    column.id === 'localizacao' ? 'w-[100px]' : '',
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
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`px-2 md:px-2 py-4  text-sm font-medium text-gray-900 border-r border-gray-300 ${
                        index === 0 ? 'rounded-bl-lg' : ''
                      } ${
                        index === row.cells.length - 1
                          ? 'rounded-br-lg w-[100px] border-none'
                          : ''
                      }`}
                    >
                      <div
                        className={`${index === 0 ? 'rounded-bl-lg' : ''} ${
                          index === row.cells.length - 1 ? 'rounded-br-lg' : ''
                        } ${
                          cell.column.id === 'materia' && cell.value.length > 11
                            ? ''
                            : ''
                        } ${
                          cell.column.id === 'horario' && isBreakingHour
                            ? ''
                            : ''
                        }`}
                      >
                        {cell.render('Cell')}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
