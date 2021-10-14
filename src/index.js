/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, theme } from './theme';

import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    runOnJS,
} from 'react-native-reanimated';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { jobsData, categories } from './data';
import { getRotationDegree } from './helpers';
import { elevation_1, elevation_3 } from './utils';

import JobMatchedCard from './components/JobMatchedCard';

const SCR_WIDTH = Dimensions.get('window').width;

const FILTER_ICON_SIZE = 24;
const SEARCH_ICON_SIZE = 26;
const CLOCK_ICON_SIZE = 16;



const Header = () => {
    return (
        <View style={{ marginTop: 16 }}>
            <MaterialIcons name='sort' size={28} color='black' />
        </View>
    );
};

const FilterButton = () => {
    return (
        <TouchableOpacity>
            <MaterialIcons name='filter-center-focus' size={FILTER_ICON_SIZE} />
        </TouchableOpacity>
    );
};

const Input = () => {
    return (
        <View style={styles.inputContainer}>
            <MaterialIcons name='search' size={SEARCH_ICON_SIZE} />
            <TextInput
                placeholder='Search for jobs'
                style={{
                    flex: 1,
                    height: 48,
                    backgroundColor: theme.input,
                    paddingHorizontal: 10,
                }}
            />
            <FilterButton />
        </View>
    );
};


const CardTitle = ({ title }) => {
    return (
        <Text style={styles.subTitle}>{title}</Text>
    );
};

const JobStatus = ({ order }) => {
    return (
        <View style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <MaterialIcons name='access-time' size={CLOCK_ICON_SIZE} />
            <Text style={{
                marginLeft: 8,
                fontWeight: '500'
            }}>
                <Text>{order.message}</Text>
                <Text style={{
                    fontWeight: '700'
                }}>{' '}{order.countMsg}</Text>
            </Text>
        </View>
    );
};

const JobCardFooter = ({ applied, hoursAgo }) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20
        }}>
            <View style={{
                flexDirection: 'row',
            }}>
                {applied.map((person, i) => (
                    <View key={`${i}`} style={{
                        height: 32,
                        width: 32,
                        borderRadius: 32 / 2,
                        borderWidth: 2,
                        borderColor: '#fff',
                        marginRight: -10
                    }}>
                        <Image
                            source={person.img}
                            style={{
                                height: '100%',
                                width: '100%',
                                borderRadius: 32 / 2,
                            }}
                        />
                    </View>
                ))}
            </View>

            <Text style={{
                fontSize: 14,
                fontWeight: '500'
            }}>{hoursAgo}</Text>
        </View>
    );
};




const CategoryCard = () => {
    return (
        <View style={styles.categoryCardContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 30
                }}
            >
                {categories.map(category => (
                    <View key={category.name} style={styles.categoryCard}>
                        <View style={{
                            height: 30,
                            width: 30,
                            backgroundColor: '#fff'
                        }} />

                        <Text style={{
                            fontSize: 12,
                            marginTop: 10
                        }}>{category.name}</Text>

                        <Text style={{
                            fontSize: 16,
                            marginTop: 8,
                            fontWeight: '700'
                        }}>{category.count}k Jobs</Text>

                        <TouchableOpacity style={{
                            paddingVertical: 8,
                            paddingHorizontal: 10,
                            backgroundColor: '#fff',
                            borderRadius: 6,
                            marginTop: 10
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 9,
                                fontWeight: '500',
                            }}>View Jobs</Text>
                        </TouchableOpacity>

                    </View>
                ))}
            </ScrollView>
        </View>
    );
};


const JobCategoryCard = () => {
    return (
        <View style={styles.subContainer}>
            <CardTitle title='Job Category' />
            <CategoryCard />
        </View>
    );
};


const App = gestureHandlerRootHOC(() => {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' />

            <Header />

            <Text style={styles.title}>{`Find the World's most\nAmazing Jobs`}</Text>

            <Input />

            <JobMatchedCard />

            <JobCategoryCard />

        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30
        // flexDirection: ''
    },
    title: {
        marginTop: 28,
        fontSize: 26,
        fontWeight: '600'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.input,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginTop: 28
    },
    subContainer: {
        marginTop: 30,
    },
    subTitle: {
        fontSize: 22,
        fontWeight: '600'
    },
    jobCardContainer: {
        height: 230,
        backgroundColor: theme.cardBackground,
        borderRadius: 12,
        paddingVertical: 22,
        paddingHorizontal: 26,
        marginTop: 30,
    },
    categoryCardContainer: {
        marginTop: 30,
        marginHorizontal: -30,
        // paddingHorizontal: 30
    },
    categoryCard: {
        paddingVertical: 16,
        paddingHorizontal: 18,
        backgroundColor: theme.cardBackground,
        borderRadius: 12,
        marginRight: 12
    }
});

export default App;


// let stack = [];

// ops.forEach(op => {
//   if (op == "C") {
//     stack.pop();
//     return;
//   }

//   if (op == "D") {
//     stack.push(stack[stack.length - 1] * 2);
//     return;
//   }

//   if (op == "+") {
//     stack.push(stack[stack.length - 1] + stack[stack.length - 2]);
//     return;
//   }
//   stack.push(Number(op));
// })

// result = stack.reduce((a, b) => a + b, 0);