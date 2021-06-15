//
//  NativeButton.swift
//  TemplateProject
//
//  Created by MacMini 244 on 6/15/21.
//

import Foundation

@objc(NativeButton)
class NativeButton: RCTViewManager {
  override func view() -> UIView! {
    return NativeButtonView()
  }
}
