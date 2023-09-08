import resultService from "../services/resultService.js"
/**
 * get result by result id.
 *
 * @returns {Object} object containing result.
 */

const getResultById = (req, res) => {
    return resultService.getResultById(req, res);
}

export const resultController = { getResultById };