import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../../constants/colors';
import { formatNumberWithSuffix } from '../../helpers/helper-functions';

const VoteStatBar = (props) => {
  let { votes } = props;

  let percentDownVote = 50
  let percentUpVote = 50

  votes  = votes.filter((vote) => vote.vote !== 'UNDONE')

  const totalVotes = votes?.length;
  const downVotes = votes.filter((vote) => vote.vote === 'DOWNVOTE').length
  const upVotes = votes.filter((vote) => vote.vote === 'UPVOTE').length

   if(totalVotes !== 0) {
    percentUpVote = upVotes * 100 / (+totalVotes)
    percentDownVote = downVotes * 100 / (totalVotes)
   }

  return (
  <View style={styles.voteStat}>
    <View style={styles.percentages}>
      <View><Text style={[styles.text, styles.positive]}>{percentUpVote}%</Text></View>
      <View><Text style={[styles.text, styles.negative]}>{percentDownVote}%</Text></View>
    </View>
    <View style={styles.voteBar}>
      <View style={{...styles.likes, width: `${percentUpVote}%`} }/>
      <View style={{...styles.dislikes, width: `${percentDownVote}%`}} />
    </View>
    <Text style={{fontWeight: 'bold', fontSize: 10,alignSelf: 'flex-end'}}>{formatNumberWithSuffix(totalVotes)}</Text>
  </View>
  )
}

const styles = StyleSheet.create({
  percentages:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  voteBar: {
    display: 'flex',
    flex: 2/5,
    alignSelf: "center",
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius:10,
    width: 180,
    backgroundColor:'red',
    padding:0,
    margin:0
  },
    voteStat: {
    display: 'flex',
    flex:1,
    width: 200,
    alignSelf: 'flex-end',
    flexDirection: 'column',
    right:20,
  },

  likes: {
    backgroundColor: 'green',
    height:'100%',
    flexGrow:1
  },
  dislikes: {
    backgroundColor: colors.primaryColor,
    height:'100%',
    flexGrow:1
  },
  text: {
    fontWeight:'100',
  },
  positive: {
    color: 'green'
  },
  negative: {
    color: colors.primaryColor
  }

})

VoteStatBar.propTypes = {
  votes: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default VoteStatBar