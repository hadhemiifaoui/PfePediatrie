const User = require('../../models/users/user')
const Child = require('../../models/users/childs')
const mongoose = require('mongoose')

const create = async (req, res) => {
  try {
    const { name, dob, gender, bloodType, weight, height, parent, pediatre } = req.body;
    
    const image = req.file ? req.file.filename : null;

    const newChild = new Child({
      name,
      dob,
      gender,
      bloodType,
      weight,
      height,
      parent,
      pediatre,
      image
    });
    await newChild.save();
    await User.findByIdAndUpdate(
      parent,
      { $push: { children: newChild._id } },
      { new: true, useFindAndModify: false }
    );
    await User.findByIdAndUpdate(
      pediatre,
      { $push: { children: newChild._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(201).json({
      success: true,
      message: 'Child created successfully',
      data: newChild
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating child',
      error: error.message
    });
  }
};

const getChildrenForParent = async (req, res) => {
  try {
      const parent = req.user.id;
      const children = await Child.find({ parent }).populate('parent');
      res.status(200).json(children);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllChilds = async (req, res) => {
  try {
      const allchilrens = await Child.find().populate('parent').populate('pediatre');
      res.status(200).json(allchilrens);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

const getChildById = async(req , res) =>{
try {
  const { id } = req.params;
  const child = await Child.findById(id).populate('parent').populate('pediatre');

  if (!child) {
    return res.status(404).json({ message: 'Child Not Found!' });
  }

  res.status(200).json(child);
}
catch (error) {
  console.error('Error fetching child by ID:', error);
  res.status(500).json({ message: 'Internal Server Error' });
}

}
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Child ID' });
    }

    const child = await Child.findById(id);
    if (!child) {
      return res.status(404).json({ message: 'Child Not Found!' });
    }

    await User.findByIdAndUpdate(child.parent, { $pull: { children: id } }, { new: true, useFindAndModify: false });
    await User.findByIdAndUpdate(child.pediatre, { $pull: { children: id } }, { new: true, useFindAndModify: false });

    const removedChild = await Child.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Child deleted successfully',
      data: removedChild
    });
  } catch (error) {
    console.error('Error deleting child:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const update = async (req, res) => {
  try {
      const { id } = req.params;
      const childData = req.body;
      const updatedChild = await Child.findByIdAndUpdate(id, childData, { new: true }).populate('parent').populate('pediatre');
      if (!updatedChild) {
          res.status(404).json({ message: 'Child Not Found!' });
      }
      res.status(200).json(updatedChild);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
}

const getChildrenByParentId = async (req, res) => {
  try {
    const { id } = req.params; // Parent ID

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Parent ID' });
    }

    const children = await Child.find({ parent: id }).populate('parent').populate('pediatre');

    if (!children || children.length === 0) {
      return res.status(404).json({ message: 'No children found for this parent' });
    }

    res.status(200).json(children);
  } catch (err) {
    console.error('Error fetching children by parent ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//tets 
const getChildByPediatreIdAndChildId = async (req, res) => {
  try {
    const { pediatreId, childId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pediatreId)) {
      return res.status(400).json({ message: 'Invalid Pediatre ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(childId)) {
      return res.status(400).json({ message: 'Invalid Child ID' });
    }

    const child = await Child.findOne({ _id: childId, pediatre: pediatreId })
                             .populate('parent')
                             .populate('pediatre');

    if (!child) {
      return res.status(404).json({ message: 'Child not found for this pediatre' });
    }

    res.status(200).json(child);
  } catch (err) {
    console.error('Error fetching child by pediatre and child ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const getChildrenForPediatre = async (req, res) => {
  try {
    const pediatreId = req.user.id;
    const children = await Child.find({ pediatre: pediatreId }).populate('parent').populate('pediatre');
    if (!children) {
      return res.status(404).json({ message: 'No children found for this Pediatre' });
    }
    res.status(200).json(children);
  } catch (error) {
    console.error('Error fetching children for pediatre:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllPediatre = async (req, res) => {
  console.log('Request Parameters:', req.params);
  console.log('Request Query:', req.query);
  try {
    const pediatre = await User.find({ role: 'pediatre' }).exec();
    console.log('Pediatres fetched:', pediatre);
    if (pediatre.length === 0) {
      console.log('No users found with role "pediatre".');
    }
    res.status(200).json(pediatre);
  } catch (error) {
    console.error('Error fetching pediatres:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

  const getPedByChildId = async (req , res) =>{
    try{
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid child ID' });
      }
 
      const child = await Child.findById(id).select('pediatre');
      if (!child) {
        return res.status(404).json({ error: 'Child not found' });
      }

      const pediatreId = child.pediatre;
  
    
      if (!mongoose.Types.ObjectId.isValid(pediatreId)) {
        return res.status(400).json({ error: 'Invalid pediatre ID' });
      }

      const pediatre = await User.findById(pediatreId);  
      if (!pediatre) {
        return res.status(404).json({ error: 'Pediatre not found' });
      }
      res.status(200).json(pediatre);
      }
     catch(error){
      console.error('Error fetching pediatre by child ID:', error.message);
      res.status(500).json({ error: 'Internal server error' });
     }
  }
  const getChildByPediatreAndParent = async (req, res) => {
    try {
      const { pediatreId, parentId } = req.params;
  
      // Find the pediatre by ID and populate the children array
      const pediatre = await User.findById(pediatreId).populate('children');
  
      if (!pediatre) {
        return res.status(404).json({ message: 'Pediatre not found' });
      }
  
      // Find children associated with this pediatre and filter by parent ID
      const children = await Child.find({ 
        _id: { $in: pediatre.children }, 
        parent: parentId 
      });
  
      if (children.length === 0) {
        return res.status(404).json({ message: 'No children found for this parent under this pediatre' });
      }
  
      res.json(children);  // Send the filtered children
    } catch (error) {
      console.error('Error fetching child by pediatre and parent:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { create, getChildrenForParent, getAllChilds, getChildById,
   remove, update , getChildrenByParentId , getChildrenForPediatre ,getAllPediatre, 
   getChildByPediatreIdAndChildId ,getPedByChildId  , getChildByPediatreAndParent};