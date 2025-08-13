import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortMethod {
  Alphabet = 'alphabet',
  Length = 'length',
}

enum ReverseMethod {
  Reverse = 'reverse',
}

function getPreparedGood(
  goods: string[],
  sortField: SortMethod | '',
  reverseField: ReverseMethod | '',
) {
  const preparedGood = [...goods];

  if (sortField) {
    preparedGood.sort((good1, good2) => {
      switch (sortField) {
        case SortMethod.Alphabet:
          return good1.localeCompare(good2);

        case SortMethod.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGood.reverse();
  }

  return preparedGood;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortMethod | ''>('');
  const [reverseField, setReverseField] = useState<ReverseMethod | ''>('');
  const visibleGoods = getPreparedGood(
    goodsFromServer,
    sortField,
    reverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortMethod.Alphabet)}
          className={cn('button  is-info ', {
            'is-light': sortField !== SortMethod.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortMethod.Length)}
          className={cn('button  is-success ', {
            'is-light': sortField !== SortMethod.Length,
          })}
        >
          Sort by length
        </button>

        {/* для кнопки реверс встановив пермикач зміни стану(true-false, це toogle кнопка) */}
        <button
          type="button"
          onClick={() =>
            setReverseField(prev => (prev ? '' : ReverseMethod.Reverse))
          }
          className={cn('button  is-warning ', {
            'is-light': reverseField !== ReverseMethod.Reverse,
          })}
        >
          Reverse
        </button>
        {(sortField || reverseField) && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setReverseField('');
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
