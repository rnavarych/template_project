import React, {useState} from 'react';
import {FAB, Portal} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

//eslint-disable-next-line no-unused-vars
import styles from './styles';

const Filter = ({filterOptions, setFilterOptions}) => {
  const {photo, video} = filterOptions;
  const [open, setOpen] = useState(false);
  const onStateChange = ({open: openFba}) => setOpen(openFba);
  return (
    <Portal>
      <FAB.Group
        open={open}
        animated={false}
        icon={({size, color}) => (
          <Ionicons name="ios-filter-outline" size={size} color={color} />
        )}
        actions={[
          {
            icon: ({size, color}) => (
              <Ionicons name="ios-videocam-outline" size={size} color={color} />
            ),
            onPress: () => setFilterOptions({...filterOptions, video: !video}),
            style: video ? {backgroundColor: 'red'} : null,
          },
          {
            icon: ({size, color}) => (
              <Ionicons name="ios-image-outline" size={size} color={color} />
            ),

            onPress: () => setFilterOptions({...filterOptions, photo: !photo}),
            style: photo ? {backgroundColor: 'red'} : null,
          },
        ]}
        onStateChange={onStateChange}
      />
    </Portal>
  );
};

export default Filter;
