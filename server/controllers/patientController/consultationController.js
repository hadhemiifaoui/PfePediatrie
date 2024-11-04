const Consultation = require('../../models/users/consultation');
const User = require('../../models/users/user');
const Child = require('../../models/users/childs');
const { generateMeetLink } = require('../../emailServices/OAuth');
const { notifyUsers } = require('../../emailServices/emailnotif');

const createConsultation = async (req, res) => {
  try {
    const { pediatreId, childId, dateTime, roomId } = req.body;

    if (!pediatreId || !childId) {
      return res.status(400).send('pediatreId and childId are required');
    }

    const pediatre = await User.findById(pediatreId);
    const child = await Child.findById(childId)
    console.log('Pediatrician:', pediatre); 
     console.log('Child:', child);
    if (!pediatre || !child) {
      return res.status(404).send('Pediatrician or child not found');
    }

    const newConsultation = new Consultation({
      pediatre: pediatreId,
      child: childId,
      dateTime: dateTime || null, 
      roomId: roomId || null, // Include roomId if provided
    });

    await newConsultation.save();

    if (dateTime) {
      await notifyUsers(pediatre.email, `You have a new consultation scheduled for ${child.name} on ${dateTime}`);
      await notifyUsers(child.parent.email, `A consultation for your child ${child.name} has been scheduled with Dr. ${pediatre.lastname} on ${dateTime}`);
    } else {
      await notifyUsers(pediatre.email, `New consultation request for ${child.name}`);
      await notifyUsers(child.parent.email, `A consultation has been requested for your child ${child.name}`);
    }

    res.status(201).send(newConsultation);
  } catch (err) {
    console.error('Error in createConsultation:', err);
    res.status(500).send(err.message);
  }
};

const getConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    const consultation = await Consultation.findById(id)
      .populate('pediatre')
      .populate('child');
      
    if (!consultation) {
      return res.status(404).send('Consultation not found');
    }
    
    res.send(consultation);
  } catch (err) {
    res.status(500).send(err.message);
  }
};



const getAll = async (req, res ) => {
  try{
      const consults = await Consultation.find()
      res.json(consults)
  }
  catch(error) {
    console.error(error)
  }
}
const requestConsultation = async (req, res) => {
  try {
    const { pediatreId, childId, roomId } = req.body; // Accept roomId from request body

    const pediatre = await User.findById(pediatreId);
    const child = await Child.findById(childId).populate('parent');

    if (!pediatre || !child) {
      return res.status(404).send('Pediatrician or child not found');
    }

    const newConsultation = new Consultation({
      pediatre: pediatreId,
      child: childId,
      dateTime: null, 
      roomId: roomId || null, // Include roomId if provided
    });

    await newConsultation.save();

    await notifyUsers(pediatre.email, `New consultation request for ${child.name}`);
    await notifyUsers(child.parent.email, `A consultation has been requested for your child ${child.name}`);

    res.status(201).send({ message: "Consultation requested successfully", consultation: newConsultation });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const scheduleConsultation = async (req, res) => {
  try {
    const { consultationId, dateTime, roomId } = req.body; 

    const consultation = await Consultation.findById(consultationId)
      .populate('child')
      .populate('pediatre');

    if (!consultation) {
      return res.status(404).send('Consultation not found');
    }

    const meetLink = await generateMeetLink();

    if (!meetLink) {
      return res.status(500).send('Failed to generate Google Meet link');
    }

    consultation.dateTime = dateTime;
    consultation.meetLink = meetLink;
    consultation.roomId = roomId;

    await consultation.save();

    await notifyUsers(consultation.pediatre.email, `Consultation scheduled for ${consultation.child.name} on ${dateTime}. Join here: ${meetLink}`);
    await notifyUsers(consultation.child.parent.email, `Consultation scheduled with Dr. ${consultation.pediatre.lastname} on ${dateTime}. Join here: ${meetLink}`);

    res.status(200).send({ message: "Consultation scheduled successfully", consultation });
  } catch (err) {
    console.error('Error in scheduleConsultation:', err);
    res.status(500).send(err.message);
  }
};


const joinConsultation = async (req, res) => {
  try {
    const { roomId } = req.params; // Extract roomId from params

    if (!roomId) {
      return res.status(400).send('roomId is required');
    }

    const consultation = await Consultation.findOne({ roomId })
      .populate('pediatre')
      .populate('child');

    if (!consultation) {
      return res.status(404).send('Consultation not found');
    }

    if (consultation.status === 'active') {
      return res.status(400).send('Consultation is already active');
    }

    consultation.status = 'active';
    await consultation.save();

    await notifyUsers(consultation.pediatre.email, `Consultation with ${consultation.child.name} has started.`);
    await notifyUsers(consultation.child.parent.email, `Consultation with Dr. ${consultation.pediatre.lastname} has started.`);

    res.status(200).send({ message: "Consultation is now active", consultation });
  } catch (err) {
    console.error('Error in joinConsultation:', err);
    res.status(500).send(err.message);
  }
};


module.exports = { createConsultation, getConsultation, requestConsultation, scheduleConsultation, joinConsultation, getAll };
