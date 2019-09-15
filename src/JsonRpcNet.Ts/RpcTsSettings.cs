﻿#region License
// Copyright © 2018 Darko Jurić
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
#endregion

using System;
using System.Linq.Expressions;
using System.Text.RegularExpressions;

namespace JsonRpcNet.Ts
{
    /// <summary>
    /// RPC-Ts settings used for TypeScript code generation.
    /// </summary>
    /// <typeparam name="T">Class or interface type.</typeparam>
    public class RpcTsSettings<T>
    {
        Expression<Action<T>>[] _omittedMethods = new Expression<Action<T>>[0];
        /// <summary>
        /// Gets or sets the methods of the class / interface that should be omitted when creating the JavaScript code.
        /// </summary>
        public Expression<Action<T>>[] OmittedMethods
        {
            get { return _omittedMethods; }
            set
            {
                if (_omittedMethods == null)
                    throw new ArgumentException("The value must be not null.");

                _omittedMethods = value;
            }
        }

        /// <summary>
        /// Gets or sets JS module format of the generated files.
        /// </summary>
        public Module Format
        {
            get;
            set;
        } = Module.None;

        string nameOverwrite = null;
        /// <summary>
        /// JavaScript API name. If null, the name is the same as the corresponding .NET type name.
        /// </summary>
        public string NameOverwrite
        {
            get { return nameOverwrite; }
            set
            {
                if (value != null)
                {
                    var isValid = Regex.Match(value, "^[a-zA-Z_][a-zA-Z0-9_]*$").Success;
                    if (!isValid)
                        throw new ArgumentException("The name-overwrite must be valid Javascript name or null (if autogenerated).");
                }

                nameOverwrite = value;
            }
        }

        public enum Module
        {
            None,
            RequireJS,
            CommonJS
        }
    }
}