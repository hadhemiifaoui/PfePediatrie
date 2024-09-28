const  secteurController = require('../controllers/secteurController')
const express = require('express')
const router = express.Router()



router.post('/add'  , secteurController.createSecteur )
router.get('/'  ,  secteurController.getSecteurs);
router.get('/:id'  ,  secteurController.getSecteurById);
router.put('/:id'  ,  secteurController.updateSecteur);
router.delete('/:id'  ,  secteurController.deleteSecteur);
router.post('/addtoexisted' , secteurController.addCaseToSecteur)
router.delete('/:secteurId/cases/:caseId' , secteurController.deleteCaseFromSecteur)
router.get('/:secteurId/cases/:caseId' , secteurController.getCaseFromSecteur)
router.get('/:secteurId/cases' ,secteurController.getAllCasesFromSecteur )
router.put('/:secteurId/cases/:caseId' , secteurController.updateCaseIntoSector)
module.exports = router