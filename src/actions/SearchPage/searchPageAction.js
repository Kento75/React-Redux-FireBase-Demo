import * as types from '../../types';
import { firebaseDb } from '../../firebase';

const ref = firebaseDb.ref('companies');

/**
 * 検索文字列変更時処理
 * @param {string} searchWord 検索文字列
 */
export function changeSearchWord(searchWord) {
  return {
    type: types.CHANGE_SEARCH_WORD,
    searchWord,
  };
}

/**
 * 実行中ダイアログ表示処理
 */
function requestProcess() {
  return { type: types.REQUEST_PROCESS };
}

/**
 * 検索処理
 */
export function searchData() {
  return (dispatch, getState) => {
    dispatch(requestProcess());
    const company_code = getState().searchPageReducer.searchWord;
    ref.off();
    ref.on(
      //        company_code,
      'value',
      snapshot => {
        dispatch(searchSuccess(snapshot));
      },
      error => {
        dispatch(searchError(error));
      }
    );
  };
}

/**
 * 検索成功時
 */
function searchSuccess(snapshot) {
  return {
    type: types.SUCCESS_SEARCH,
    searchedList: snapshot.val(),
  };
}

/**
 * 検索失敗時
 */
function searchError(error) {
  return {
    type: types.FAILED_SEARCH,
    title: '検索失敗',
    message: error.message,
  };
}

/**
 * アラートメッセージ変更処理
 * @param {string} message アラートメッセージ
 */
export function changeAlertMessage() {
  return {
    type: types.CHANGE_ALERT_MESSAGE,
  };
}
