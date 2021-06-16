//
//  1.swift
//  TemplateProject
//
//  Created by MacMini 244 on 5/6/21.
//

import Foundation

import UIKit

class NativeButtonView: UIView {
  @objc var onClick: RCTDirectEventBlock?
  
  @objc var title: String = "button"  {
    didSet {
      button.setTitle(title, for: .normal)
    }
    
  }
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.addSubview(button)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init has not been implemented")
  }
    
  lazy var button: UIButton = {
    let button = UIButton.init(type: UIButton.ButtonType.system)
    button.titleLabel?.font = UIFont.systemFont(ofSize: 20)
    button.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    button.addTarget(self, action: #selector(buttonClick), for: .touchUpInside)
    return button
  }()
  
  @objc func buttonClick() {
    onClick!(["test": "test"])
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
}
