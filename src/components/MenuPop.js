import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { Menu, Button, Divider, IconButton} from 'react-native-paper'
import { newLens } from '../config/firebase'

export default MenuPop = (refresh) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

    return (
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
            <IconButton
            icon="plus"
            iconColor={"white"}
            backgroundColor={"#1D637A"}
            size={40}
            style={{alignSelf: "center",}}
          />
          </TouchableOpacity>
          }>
          <Menu.Item onPress={async () => {
            await newLens("daily");
            refresh.forceAnUpdate();
            closeMenu();
         }} title="Daily" />
          <Menu.Item onPress={async () => {
            await newLens("weekly");
            refresh.forceAnUpdate();
            closeMenu();
         }} title="Weekly" />
          <Menu.Item onPress={async () => {
            await newLens("biweekly");
            refresh.forceAnUpdate();
            closeMenu();
         }} title="Bi-Weekly" />
          <Menu.Item onPress={async () => {
            await newLens("monthly");
            refresh.forceAnUpdate();
            closeMenu();
         }} title="Monthly" />
        </Menu>
      </View>
    )
  }